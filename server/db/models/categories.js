const Sequelize = require('sequelize');
const db = require('../db');


const Categories = db.define('category', {
    name: {
        unique: true,
        allowNull: false
    }
})


module.exports = Categories;
