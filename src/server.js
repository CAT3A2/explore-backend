const dotenv = require("dotenv");
dotenv.config();

// Database
const sequelize = require("./config/database.js");
const setAssociations = require("./config/modelAssociations");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5500;

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const profileRouter = require("./routes/profile");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/profile", profileRouter);

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

// connect local postgres db to heroku postgres db
