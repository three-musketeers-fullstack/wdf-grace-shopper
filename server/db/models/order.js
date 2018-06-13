const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  userAddress: {
    type: Sequelize.TEXT,
  },
  userName: {
    type: Sequelize.STRING,
  },
});

Order.beforeUpdate(orderInstance => {
  orderInstance.total = 0;
  orderInstance.getProducts().then(products => {
    products.map(product => {
      orderInstance.total += product.price;
    });
  });
});

module.exports = Order;
