import React from 'react';
import { connect } from 'react-redux';

const Checkout = props => {
  return (
    <div>
      <form action="your-server-side-code" method="POST">
        <script
          src="https://checkout.stripe.com/checkout.js"
          class="stripe-button"
          data-key="pk_test_emv5YJOmcMRleAc2xmr7pZyR"
          data-amount="999"
          data-name="Demo Site"
          data-description="Example charge"
          data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
          data-locale="auto"
        />
      </form>
    </div>
  );
};

export default Checkout;
