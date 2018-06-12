const router = require("express").Router();
const { Order, User, Product, OrderProduct } = require("../db/models");
const { security } = require("./security");
module.exports = router;

//look for req.user.isAdmin to see if a user is admin
//only admin can see all orders
router.get("/", (req, res, next) => {
  Order.findAll({
    where: {isPurchased: true},
    include: [{ model: Product }]
  })
    .then(orders => {
      return security(orders, req, res);
    })
    .catch(next);
});

//To get all previous purchases for User

router.get("/history/:userId", (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
      isPurchased: true

    },
    include:[{model: Product}]
  })
    .then(orderHistory => {
      return security(orderHistory, req, res);
    })
    .catch(next);
});



// instantiate/update cart upon adding product

router.put("/cart/:userId", (req, res, next) => {
  Order.findOrCreate({ where: { userId: req.params.userId } })
    .then(result => result[0])
    .then(order => {
      return order.addProducts(req.body.productId, {
        through: { quantity: req.body.quantity }
      });
    })
    .then(updateOrder => {
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

