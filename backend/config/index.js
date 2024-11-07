require("dotenv").config();
const configs = {
  PORT: process.env.PORT,
  API_VERSION: `api/v1`,
  HOST: `${process.env.HOST}`,
};
const jwtSecret = {
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  EXPIRES_IN: process.env.JWT_EXPIRES || "1d",
};
module.exports = { configs, jwtSecret };
