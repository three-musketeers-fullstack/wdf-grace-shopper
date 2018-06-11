import React from "react";
import { StripeProvider } from "react-stripe-elements";
import MyStoreCheckout from "./mystorecheckout";

const Stripe = () => {
    console.log('got here')
  return (
    <StripeProvider apiKey="pk_test_kJu855LMnGqXIIwMd1SUYN0R">
      <MyStoreCheckout />
    </StripeProvider>
  );
};

export default Stripe;