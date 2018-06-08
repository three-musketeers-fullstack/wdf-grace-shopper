const router = require("express").Router();
const { OrderProduct } = require("../db/models");
module.exports = router;

// router.get("/", (req, res, next) => {
//   OrderProduct.findAll({
//     include: [{ all: true }]
//   })
//     .then(allCarts => res.send(allCarts))
//     .catch(next);
// });
//needs work