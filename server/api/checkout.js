const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require('stripe')(keySecret);
const router = require('express').Router();
module.exports = router;

console.log(keySecret);
router.post('/charge', (req, res, next) => {
  let amount = 500;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Sample Charge',
        currency: 'usd',
        customer: customer.id,
      })
    )
    .then(charge => res.send(charge));
});
