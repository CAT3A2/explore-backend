require("dotenv").config();
const jwt = require("jsonwebtoken");

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader?.split(" ")[1];

  if (bearerHeader == null) {
    return res.sendStatus(403);
  }
  req.token = accessToken;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
