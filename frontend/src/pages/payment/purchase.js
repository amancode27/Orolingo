import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "./Checkout";
import './setup.scss';
import Screen from './Screen.js';

const stripePromise = loadStripe('pk_test_51HxBmeLi8gRXIcunG6J2gcdWHTLLEn8HXr5v3FX7PmFTpVLURjSelDbPdECxuQ4NjbM0ykoHIaOQPERXG3VYYdGA00BkocmmYF');

const Purchase = (props) => (
  
  <Elements stripe={stripePromise}>
    {/* <Screen /> */}
    <CheckoutForm {...props}/>
  </Elements>
);
export default Purchase;
