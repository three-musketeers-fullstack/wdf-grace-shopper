const router = require("express").Router();
const { User, Order, OrderProduct, Product } = require("../db/models");
const { security } = require("./security");

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
      return security(users, req, res);
    })
    .catch(next);
});

//test

router.get("/test", (req, res, next) => {
  User.findAll({})
    .then(user => {
      return security(user, req, res);
    })
    .catch(next);
});

//test end

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
      return security(user, req, res);
    })
    .catch(next);
});
