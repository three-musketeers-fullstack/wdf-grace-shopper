const router = require("express").Router();
const { Order, User } = require("../db/models");
module.exports = router;

router.get("/", (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

//To get all previous purchases for User

router.get("/:userId", (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.id,
      isPurchased: true
    }
  })
    .then(result => result.data)
    .then(orderHistory => res.send(orderHistory))
    .catch(next);
});
// instantiate/update cart upon adding product

router.put("/:userId", (req, res, next) => {
  Order.findOrCreate({ where: { userId: req.params.userId } })
    .then(result => result[0])
    .then(order => {
      order.addProducts(req.body.productId);
      res.send(order);
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
  );
});
//need to lock in price 


// router.put('/:orderId',(req,res,next) => {
//     Order
// })
