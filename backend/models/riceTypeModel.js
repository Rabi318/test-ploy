const { Schema, model } = require("mongoose");

const riceTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RiceType = model("riceTypes", riceTypeSchema);
module.exports = RiceType;
