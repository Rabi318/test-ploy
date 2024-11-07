const req = require("express/lib/request");
const { Schema, model } = require("mongoose");

const riceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "admins",
      required: true,
    },
    riceType: {
      type: Schema.Types.ObjectId,
      ref: "riceTypes",
      required: true,
    },
    weights: [
      {
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },

    plasticSacks: {
      type: Boolean,
      required: true,
    },
    sacksPrice: {
      type: Number,
    },
    quintalPrice: {
      type: Number,
    },
    subFinalPrice: {
      type: Number,
    },
    finalPrice: {
      type: Number,
    },
    calculated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Rice = model("rices", riceSchema);
module.exports = Rice;
