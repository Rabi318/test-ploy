const { Unauthorized } = require("http-errors");
const { verifyToken } = require("../utils/tokenService");

const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Unauthorized("Authorization header is missing");
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      throw new Unauthorized("Token is missing");
    }
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      throw new Unauthorized("Invalid or expired token");
    }
    req.admin = decoded;
    next();
  } catch (error) {
    console.log("Error====> ", error);
    res.status(401).json({
      success: false,
      msg: error.message || "Token is not valid",
    });
  }
};

module.exports = authenticate;
