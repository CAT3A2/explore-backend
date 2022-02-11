const sequelize = require("../config/database");
const setAssociations = require("../config/modelAssociations");

const run = async () => {
  try {
    await sequelize.createSchema("public");
  } catch {
    // Schema already exists
  }

  setAssociations();
  // all models sync with db
  await sequelize.sync({ force: true });
  console.log("All models synced");

  process.exit();
};

run();
