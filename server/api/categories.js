const router = require("express").Router();
const { Categories, Product } = require("../db/models");

module.exports = router;

router.get("/", (req, res, next) => {
  Categories.findAll({
    include: [{ model: Product }]
  })
    .then(categories => res.json(categories))
    .catch(next);
});
