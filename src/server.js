const dotenv = require('dotenv');
dotenv.config();

// Database
const sequelize = require('./config/database.js');
const { Client } = require('pg');

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5500;

const authRouter = require('./routes/auth');
const setAssociations = require('./config/modelAssociations.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/', authRouter);

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
setAssociations()

// testing server is running
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

// all models sync with db
sequelize.sync({ force: true }).then(() => console.log('All models synced'));

// connect local postgres db to heroku postgres db
