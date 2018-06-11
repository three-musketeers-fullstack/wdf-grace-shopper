const router = require("express").Router();
const { User, Product, Order } = require("../db/models");

module.exports = router;

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
    }).then(info =>console.log('>>>>>>>>>>>',info.orders[0]))
      
    //   .then(user => res.send(user))
      
      .catch(next);
  });
  