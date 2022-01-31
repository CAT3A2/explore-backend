//Connect api to Postgres database
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('Explore_Travel_Project', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

// testing the connection
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established  successfully.');
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
};

dbConnection();
module.exports = sequelize;
