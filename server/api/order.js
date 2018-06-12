const router = require("express").Router();
const { Order, User, Product } = require("../db/models");
module.exports = router;

router.get("/", (req, res, next) => {
  Order.findAll({
    include: [{model: Product}]
  })
    .then(orders => res.json(orders))
    .catch(next);
});

//To get all previous purchases for User that have been completed
router.get("/history/:userId", (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
      isPurchased: true

    },
    include:[{model: Product}]
  })
    .then(orderHistory => res.send(orderHistory))
    .catch(next);
});



// instantiate/update cart upon adding product



router.put('/cart/:userId', (req, res, next) => {
  Order.findOrCreate({ where: { userId: req.params.userId } })
    .then(result => result[0])
    .then(order => {
      return order.addProducts(req.body.productId, {
        through: { quantity: req.body.quantity },
      });
    })
    .then(updateOrder => {
      console.log(updateOrder);
      res.send(updateOrder);
    })
    .catch(next);
});

//TO change is purchased in cart
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
//need to lock in price


// router.put('/:orderId',(req,res,next) => {
//     Order
// })
