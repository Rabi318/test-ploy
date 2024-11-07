const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Credit", "Payment"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Bank-Transfer"],
      required: true,
    },
    UPINumber: {
      type: String,
    },
    bankName: {
      type: String,
    },
    bankAccountNumber: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    transactionId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transaction = model("transactions", transactionSchema);
module.exports = Transaction;
