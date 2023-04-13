const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const constants = require("../utils/constants.js");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Please login first to access this endpoint!", // No token provided
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Failed! Token is invalid.",
      });
    }
    req.userId = decoded.userId;
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  if (req.role === constants.userRole.admin) {
    next();
  } else {
    res.status(403).send({
      message: "Require Admin Role!",
    });
    return;
  }
};
module.exports = {
  verifyToken,
  isAdmin,
};
