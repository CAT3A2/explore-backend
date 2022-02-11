const express = require("express");
const app = express();
const cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const profileRouter = require("./routes/profile");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/profile", profileRouter);
app.use(cors(corsOptions));

module.exports = app;
