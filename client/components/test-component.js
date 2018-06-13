import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { fetchProductTotal, updateLocalCartState } from '../store';
import { Router } from 'react-router-dom';

const STRIPE_PUBLISHABLE = 'pk_test_emv5YJOmcMRleAc2xmr7pZyR';
const PAYMENT_SERVER_URL = 'http://localhost:8080/api/checkout';
const fromUSDToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (total, description, history, fn) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: 'USD',
      amount: total,
    })
    .then(result => {
      localStorage.clear();
      fn();
      successPayment(result);
      history.push('/');
    })
    .catch(errorPayment);

const Stripe = props => {
  const { prodTotal, history } = props;
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
        amount={prodTotal.toFixed(2)}
        token={onToken(
          Number(prodTotal.toFixed(2)),
          'The Marketplace for All Things Cubic', history,
          props.clearCart
        )}
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
  prodTotal: state.products.prodTotal,
});

const mapToDispatch = dispatch => ({
  clearCart: () => {
    dispatch(updateLocalCartState([]));
  }
})

const StripeContainer = connect(mapToProps, mapToDispatch)(Stripe);
export default StripeContainer;

// onSubmit={this.handleSubmit}
