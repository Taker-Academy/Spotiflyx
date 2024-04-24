const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'noe', 'pass', {
    host: 'db',
    dialect: 'mysql'
});

module.exports = sequelize;
