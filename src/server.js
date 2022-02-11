const dotenv = require("dotenv");
dotenv.config();
const dbConnection = require('./config/dbConnection')

const app = require("./app");

const port = process.env.PORT || 5500;

dbConnection();
// testing server is running
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});


