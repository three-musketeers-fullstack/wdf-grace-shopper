const Sequelize = require('sequelize');
const db = require('../db');


const Categories = db.define('category', {
    name: {
        type: Sequelize.STRING,
        unique: true
    }
})


module.exports = Categories;
