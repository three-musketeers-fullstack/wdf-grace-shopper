const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const Categories = require("./categories");

Order.belongsTo(User);
User.hasMany(Order);
// Order.getUser(), Order.setUser(), Order.createUser()
// User.getOrders(), User.setOrders(), User.createOrder(), User.addOrder(), User.addOrders(), User.removeOrder(), User.removeOrders(), User.hasOrder(), User.hasOrders(), User.coutOrders()

Order.belongsToMany(Product, { through: "Cart" });
Product.belongsToMany(Order, { through: "Cart" });
// order/product.getFriends() // returns a promise for the array of friends for that order/product
// order/product.addFriend(friend) // creates a new row in the friendship table for the order/product and the friend, returns a promise for the friendship (NOT the order/product OR the friend - the "friendship")
// order/product.addFriends(friendsArray) // creates a new row in the friendship table for each friend, returns a promise for the friendship
// order/product.removeFriend(friend) // removes the row from the friendship table for that order/product-friend, returns a promise for the number of affected rows (as if you'd want to destroy any friendships...right?)
// order/product.removeFriends(friendsArray) // removes the rows from the friendship table for those order/product-friend pairs, returns a promise for the number affected rows

Categories.belongsToMany(Product, { through:  'category-product'});
Product.belongsToMany(Categories, { through: 'category-product' });
//Product.setCategory('category name') // set a category to a product
// Categories.getProducts() // gets all the products of a specific category


module.exports = {
  User,
  Product,
  Order,
  Categories
};
