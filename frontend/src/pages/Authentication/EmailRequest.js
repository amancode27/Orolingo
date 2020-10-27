import React,{ useState, useEffect } from 'react';
import basename from "../Home/basename.js";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Alert } from 'reactstrap';

const EmailRequest = (props) =>{
    const [email,setEmail] = useState('');
    const [success,setSuccess]  = useState(false);
    const [error,setError]  = useState(false);
    const fieldChange = (e) =>{
        setEmail(e.target.value);
    }

    const submitForm = (props) =>{
        axios.post(`${basename}/auth/api/request-reset-email/`,{
            'email':email
        }).then(res=>{
            console.log(res.data);
            setSuccess(true);
        }).catch(err=>{
            console.log(err.response.data);
            setError(true);
        })
    }
    let e=<div></div>;

    if(success){
        e = <Alert>An email has been sent to your email id. Use it to reset your password.</Alert>
    }
    else if(error){
        e = <Alert>Please create an account first! <a href = "http://localhost:3000/signup">Click</a> here to sign up!</Alert>
    }

    const formstyle = {
        "width": "600px",
        "margin": "auto",
        "background-color": "lightsteelblue",
        "padding": "25px",
        "margin-top": "100px",
        "border-radius": "10px"
    }
    return (
        <div>
            <Form style= {formstyle}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input size="lg" type="email" name="email" id="email" placeholder="Email" onChange={fieldChange}/>
            </FormGroup>
            {e}
            <Button size = "lg" onClick = {submitForm}>Submit</Button>
            </Form>
        </div>
    )
}

export default EmailRequest;