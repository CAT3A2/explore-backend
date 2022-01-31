const dotenv = require('dotenv');
dotenv.config();

// Database connection

// Database
const sequelize = require('./config/database.js')

const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5500

app.use(cors())
app.use(express.json())

// testing server connect to db
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to postgres database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
};

dbConnection();

// testing server is running
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})
