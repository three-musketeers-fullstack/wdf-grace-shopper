const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product')

const OrderProduct = db.define('order-product', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    price: {
        type: Sequelize.INTEGER,
        defaultValue: null
    }
})

// // OrderProduct.afterCreate(lineItemInstance => {
//     let price = priceHelper(id);
//     this.setDataValues('price')
// // })
// //takes id from front end
// function priceHelper(id){
//     Product.findById(id)
//     .then(product => product.price)
//     .catch()
// }
module.exports = OrderProduct;