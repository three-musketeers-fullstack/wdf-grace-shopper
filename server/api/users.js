const router = require("express").Router();
const { User, Order, OrderProduct, Product } = require("../db/models");

module.exports = router;

//only admins can see all users info
router.get("/", (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ["id", "email"]
  })
    .then(users => {
      if(!req.user || !req.user.isAdmin) res.status(401).send('Forbidden')
      else res.send(users)
    })
    .catch(next);
});

router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId, {
    include: [
      {
        model: Order,
        include: [
          {
            all: true
          }
        ]
      }
    ]
  })
    .then(user => {
      if(!req.user || !req.user.isAdmin) res.status(401).send('Forbidden');
      else res.send(user);
    })
    .catch(next);
});
