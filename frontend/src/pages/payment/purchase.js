import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "./Checkout";
import './setup.scss';
import Screen from './Screen.js';


const stripePromise = loadStripe('pk_test_51HPYCmEIFPCEHoD2IMgEmOaX06T2UyqNeciajMsPeWvsIR5vFDa0cdwAtz9uX5Pirpz62Hm6yPEnVK5D96jdUmYn00LWR0LkhW');

const Purchase = (props) => (
  
  <Elements stripe={stripePromise}>
    {/* <Screen /> */}
    <CheckoutForm {...props}/>
  </Elements>
);
export default Purchase;


// function Purchase() {
//     return <Screen />;
// }

// export default Purchase;
