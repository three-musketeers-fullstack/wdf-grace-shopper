import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

const STRIPE_PUBLISHABLE = 'pk_test_emv5YJOmcMRleAc2xmr7pZyR';
const PAYMENT_SERVER_URL = 'http://localhost:8080/api/checkout';
const fromUSDToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (total, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: 'USD',
      amount: total,
    })
    .then(successPayment)
    .catch(errorPayment);

const Stripe = props => {
  const { localCart, products } = props;
  console.log('cart', localCart, 'products', products);
  let totalArr = [];

  localCart.forEach(cart => {
    products.forEach(product => {
      totalArr.push(cart.quantity * product.price);
    });
  });

  let total =
    totalArr &&
    Array.from(new Set(totalArr)).reduce((total, price) => (total += price), 0);
    console.log('This is cart total on checkout:', (total / 100).toFixed(2));
    console.log('total array:', totalArr);
  return (
    <div>
      <form id="payment-form">
        <div className="form-row">
          <label>Shipping Information</label>
          <label htmlFor="first-name">First Name</label>
          <input type="text" defaultValue="Enter First Name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" defaultValue="Enter Last Name" />

          <label htmlFor="address-line1"># Street</label>
          <input type="text" defaultValue="Enter # Street" />

          <label htmlFor="address-line2">Apartment Number</label>
          <input type="text" defaultValue="Enter Apt, Unit, etc." />

          <label htmlFor="address-city">City</label>
          <input type="text" defaultValue="Enter City" />

          <label htmlFor="address-state">State</label>
          <input type="text" defaultValue="Enter State" />

          <label htmlFor="address-zipcode">Zip Code</label>
          <input type="text" defaultValue="Enter Zip Code" />

          <label htmlFor="card-element">Phone Number</label>
          <input type="text" defaultValue="Enter Phone Number" />
        </div>
      </form>
      <StripeCheckout
        name="Cube"
        description="The Marketplace for All Things Cubic"
        amount={(total / 100).toFixed(2)}
        token={onToken((total / 100).toFixed(2), 'The Marketplace for All Things Cubic')}
        currency="USD"
        stripeKey={STRIPE_PUBLISHABLE}
      />
    </div>
  );
};

const mapToProps = state => ({
  localCart: state.localCart,
  user: state.user,
  products: state.products.products,
});

const StripeContainer = connect(mapToProps)(Stripe);
export default StripeContainer;

// onSubmit={this.handleSubmit}
