const router = require('express').Router()
const { Order, OrderProduct } = require('../db/models')
module.exports = router;

//routing test should be done in seperate file 

//test
router.get('/cart/:id',(req,res,next) => {
    console.log('got here', req.params.id)
    Order.findOne({
      where: {
        userId: req.params.id,
        isPurchased: false
      }
    })
      .then(cart => res.send(cart))
      .catch(next);
  })
  
  router.put("/addtocart/:userId", (req, res, next) => {
    Order.findOrCreate({
      where: {
        userId: req.params.id,
        isPurchased: false
      }
    })
      .then(result => result[0])
      .then(order => {
        return order.addProducts(req.body.productId, {
          through: { quantity: req.body.quantity }
        })
      })
  });


  router.put("/:userId/checkout", (req, res, next) => {
    Order.update(
      {
        isPurchased: true
      },
      {
        where: { userId: req.params.userId }
      }
    ).then(filledOrder => {
      OrderProduct.update(
        { price: filledOrder.total },
        { where: { orderId: filledOrder.id } }
      ).then(result => res.status(203).send(result));
    });
  });
  
  
  //end test
  
  
  
  