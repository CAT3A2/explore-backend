const sequelize = require('../config/database')
const setAssociations = require('../config/modelAssociations')

// testing server connect to db
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    setAssociations();
    console.log(
      "Connection to postgres database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

module.exports = dbConnection