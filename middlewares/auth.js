const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const auth = (req, res, next) => {
  let token = req.header("Authorization");
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  if (!token) {
    return res.status(401).json({ status: false, message: "token not found" });
  }

  try {
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    req.user = decodedInfo;
    next();
  } catch (err) {
    return res.status(403).json({ status: false, message: "invalid token" });
  }
};

module.exports = auth;
