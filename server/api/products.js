const router = require('express').Router();
const { Product, Category } = require('../db/models');
module.exports = router;


//products do not need to be secured in case someone wants to make an app for our site
router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{model: Category}]
  })
    .then(products => {
      res.send(products)
    })
    .catch(next);
});

router.get('/:id',(req,res,next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next)
})