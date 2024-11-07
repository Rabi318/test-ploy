const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected 🚀🚀");
  } catch (error) {
    console.log("MongoDB Connection Error : ", error);
  }
};

module.exports = connectDB;
