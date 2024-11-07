const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "transactions",
      },
    ],
  },
  { timestamps: true }
);

const User = model("users", userSchema);
module.exports = User;
