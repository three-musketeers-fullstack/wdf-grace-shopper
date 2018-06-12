const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require('stripe')(keySecret);
const router = require('express').Router();
module.exports = router;


const postStripeCharge = res => (stripeErr, stripeRes) => {
  // console.log('stripe error', stripeErr)
  // console.log('stripe success', stripeRes);
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

router.get('/', (req, res) => {
  res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
});

router.post('/', (req, res) => {
  console.log(req.body);
  return stripe.charges.create(req.body, postStripeCharge(res));
});
