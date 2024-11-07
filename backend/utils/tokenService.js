const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/index");
const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret.SECRET_KEY, {
    expiresIn: jwtSecret.EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret.SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
