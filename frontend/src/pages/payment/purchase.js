import React, {Component} from 'react';
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import { Container, Button, Card, CardTitle, Form, CardSubtitle, Alert } from 'reactstrap';
import axios from 'axios';


import basename from "../Home/basename.js";



class PurchaseForm extends Component {
    state = {
        loading : false,
        error : null,
        success : false
    }

    submit = (ev) => {
        ev.preventDefault();
        this.setState({loading : true});
        if(this.props.stripe)
        {
            this.props.stripe.createToken().then(result => {
                if(result.error) {
                    this.setState({error : result.error.message , loading : false });
                }
                else {
                    axios.post(`${basename}/auth/api/payment` , {stripeToken : result.token.id})
                    .then(res => {
                        this.setState({loading : false, success: true });
                    })
                    .catch( err => {
                        console.log(err);
                        this.setState({loading : false, error : err });
                    });
                }
            });
        }
        else
        {
            console.log("Stripe not present!")
        }    
    };

    render(){
        const {error, loading, success} = this.state;

        return (          
            <div className="checkout">
                {error && (
                    <Alert color="danger">
                        <h2>Sorry! Your payment was unsuccsessful!</h2>
                        <p>{JSON.stringify(error)}</p>
                    </Alert>
                )}
                {success && (
                    <Alert color="success">
                    <h2>Payment was successful!!</h2>
                    <p>
                    Go to <b>your courses</b> now! 
                    </p>
                </Alert>
                )}
                <CardSubtitle ><h3>Details of the course along with the price </h3></CardSubtitle>
                <Form className="mt-5 mr-3 ml-3">
                <CardElement />
                </Form>
                <Button className="btn btn-success btn-lg mt-5" loading={loading} disabled={loading} onClick = {this.submit} >Purchase </Button>
            </div>
                    
        )
    }

}

const InjectedForm = injectStripe(PurchaseForm);

const WrappedForm = () => (
    <Container text>
        <StripeProvider apiKey = "pk_test_51HLUrXAGlcfNbKOOuzXdE9EVx1ixPJiwMX1NSBhmTCuqrgRgDXIew4hrkeGubswZLzSiJu2ClUqLAmtzGGT9Zu7c00rYmyazeG">
            <Card body>
                <CardTitle className="text-center"><h1> Complete your purchase! </h1> </CardTitle>
                <Elements>
                    <InjectedForm />
                </Elements>
            </Card>
        </StripeProvider>  
    </Container>  
)

export default WrappedForm;