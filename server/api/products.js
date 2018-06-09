const router = require('express').Router();
const { Product, Categories } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:id',(req,res,next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next)
})