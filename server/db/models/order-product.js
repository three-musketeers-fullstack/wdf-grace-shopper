const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product');

const OrderProduct = db.define('order-product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = OrderProduct;
