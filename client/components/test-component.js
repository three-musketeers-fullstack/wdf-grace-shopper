import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_emv5YJOmcMRleAc2xmr7pZyR';
const PAYMENT_SERVER_URL = 'http://localhost:8080/api/checkout';
const fromUSDToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: 'USD',
      amount: fromUSDToCent(amount),
    })
    .then(successPayment)
    .catch(errorPayment);

const Stripe = ({}) => (
  <StripeCheckout
    name='Cube'
    description='The Marketplace for All Things Cubic'
    amount={fromUSDToCent(200)}
    token={onToken(200, 'The Marketplace for All Things Cubic')}
    currency="USD"
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Stripe;
