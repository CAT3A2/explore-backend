const express = require("express");
const app = express();
const cors = require("cors");
const { version } = require("../package.json");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const profileRouter = require("./routes/profile");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
  res.json({
    version: version,
  });
});
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/profile", profileRouter);

module.exports = app;
