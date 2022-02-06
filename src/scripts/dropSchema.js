const sequelize = require("../config/database");

sequelize.dropSchema("public").then(() => {
  process.exit();
});
