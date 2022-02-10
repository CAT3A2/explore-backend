const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

// Database
const sequelize = require("./config/database.js");
const setAssociations = require("./config/modelAssociations");

const app = require('./app')

const port = process.env.PORT || 5500;

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

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

dbConnection();
// testing server is running
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

