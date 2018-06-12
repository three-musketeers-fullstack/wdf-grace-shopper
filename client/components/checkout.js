import React, { Component } from 'react';
import axios from 'axios';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    let elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  handleSubmit(ev) {
    ev.preventDefault();
    if (!this.card) return;
    this.stripe
      .createToken(this.card)
      .then(result => {
        return axios.post('/api/checkout/charge', result);
      })
      .then(chargeRes => console.log(chargeRes))
      .catch(console.err);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="payment-form">
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

            <label htmlFor="card-element">First Name</label>
            <input type="text" defaultValue="Enter First Name" />

            <label htmlFor="card-element">Credit or debit card</label>
            <div style={{ width: '30em' }} id="card-element">
              a Stripe Element will be inserted here.
            </div>

            <div id="card-errors">Used to display form errors</div>
          </div>

          <input
            type="submit"
            className="submit"
            value="Submit Payment"
          />
        </form>
      </div>
    );
  }
}
