const router = require("express").Router();
const { OrderProduct } = require("../db/models");
module.exports = router;
//cart
router.get("/:orderId", (req, res, next) => {
 
  OrderProduct.findOne({
      where: { orderId: req.params.orderId}
  })
    .then(cart => res.send(cart))
    .catch(next);
});
//needs work