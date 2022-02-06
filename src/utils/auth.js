// Verify Token Middleware
const verifyToken = (req, res, next) => {
  console.log("asdfasdfasdf");
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader && bearerHeader.split(" ")[1];

  if (!bearerHeader) {
    res.sendStatus(403);
    return;
  }
  req.token = accessToken;

  next();
};

module.exports = {
  verifyToken,
};
