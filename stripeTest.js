var stripe = require("stripe")("sk_test_IgljLJFizM9DySF7CbgzBk1c");

const charge = stripe.charges.create({
  amount: 999,
  currency: 'usd',
  source: 'tok_visa',
  receipt_email: 'jenny.rosen@example.com',
});

charge
.then(res => console.log(res));
