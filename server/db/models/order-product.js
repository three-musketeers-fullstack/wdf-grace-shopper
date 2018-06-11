const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");

const OrderProduct = db.define("order-product", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

// const helperFunc = orderProdInstance => {
//     console.log('we got here!!<><><><>')
//     const { productId } = orderProdInstance;
//     const { quantity } = orderProdInstance;
//     const cost = Product.findById(productId)
//         .then(product => product.price)
//     orderProdInstance.update({price: cost * quantity})
//         .then(updatedOrder => updatedOrder)
// }

// OrderProduct.afterValidate(orderProdInstance => {
//    return helperFunc(orderProdInstance);
// });

OrderProduct.afterCreate(orderInstance => {
  console.log("gothere<><><>");
  orderInstance.price += 100;
});
module.exports = OrderProduct;

//const { productId } = orderProdInstance;
//   let product = Product.findById(productId);
//   //let order = OrderProduct.findOne({ where: { productId } });
//   Promise.all([product, order])
//     .then(prodAndOrderArr => {

//         const { price } = prodAndOrderArr[0];
//         const { id } = prodAndOrderArr[0];
//         const { quanity } = prodAndOrderArr[1];

//         prodAndOrderArr[1].update({ price: price * quanity}, {
//             where:{
//                 productId: id
//             }
//         })

//     })
