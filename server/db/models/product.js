const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.00,
      notEmpty: true
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://image.freepik.com/free-icon/single-cube_318-36160.jpg'
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 1,
      max: 5
    }
  }
})

// class method to more easily filter by category
// Product.findByCategories =  function(){

// };

// instance method will need to be wired up to user quanitity input
Product.prototype.updateInventory = function(num) {
  this.inventory = this.inventory - num;
};

module.exports = Product;
