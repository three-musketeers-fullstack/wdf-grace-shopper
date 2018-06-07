const router = require("express").Router();
const { Order, User } = require("../db/models");
module.exports = router;

router.get("/", (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

//TO change is purchased in cart
router.put("/:userId", (req, res, next) => {
  Order.update(
    {
      isPurchased: true
    },
    {
      where: { userId: req.params.userId }
    }
  );
});

//To get all previous purchases for User

router.put("/:userId", (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.id,
      isPurchased: true
    }
  });
});

// router.put('/:orderId',(req,res,next) => {
//     Order
// })
