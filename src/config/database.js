//Connect api to Postgres database
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('Explore_Travel_Project', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
