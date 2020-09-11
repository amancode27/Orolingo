import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState,useEffect} from "react";
import './Checkout.css';
import axios from "axios";
import basename from "../Home/basename.js";
import { Alert } from 'reactstrap';

const CheckoutForm = (props) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();
// Handle real-time validation errors from the CardElement.
  const course_id = props.match.params['id'];
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }


  useEffect(()=>{
    setEmail(props.user['email']);
  },[props])

  
// Handle form submission.
  const MakePayment = async () =>{
    const card = elements.getElement(CardElement);
    const {paymentMethod, error} = await stripe.createPaymentMethod({
      type: 'card',
      card: card
    });

    console.log(paymentMethod);
    axios.post(`${basename}/auth/api/payment/save-stripe-info/`,{
        'email':email,
        'payment_method_id':paymentMethod.id,
        'course_id':course_id,
        'student_id':props.userId
    }).then(res=>{
        console.log(res);
    })
          
  }
const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`${basename}/api/student_course/?student=${props.userId}&course=${course_id}`)
         .then(res=>{
            console.log(res);
            if(res.data.objects.length){
                setError("You can't purchase the same course twice!");
            }
            else{
                 MakePayment();
            }
         })
  
}
let e;
if(error)
   e = (<Alert color="danger" style={{width:"100%"}}>
        {error}
      </Alert> )
else
    e = <div></div>

return (
  <form onSubmit={handleSubmit} className="stripe-form">
    <div className="form-row">
      <label htmlFor="email">Email Address :</label>
      <input className="form-input" id="email" name="name"    type="email" placeholder="jenny.rosen@example.com" required 
value={email} onChange={(event) => { setEmail(event.target.value)}} />
    </div>
    <div className="form-row">
      <label for="card-element">Credit or debit card</label> 
      <CardElement id="card-element" onChange={handleChange}/>
      {e}
    </div>
    <button type="submit" className="submit-btn">
      Submit Payment
    </button>
  </form>
 );
};
export default CheckoutForm;