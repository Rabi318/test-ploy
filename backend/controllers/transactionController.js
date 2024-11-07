const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

const createTransaction = async (req, res) => {
  try {
    const {
      userId,
      type,
      amount,
      date,
      note,
      paymentMode,
      UPINumber,
      bankName,
      bankAccountNumber,
      transactionId,
    } = req.body;
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    const newTransaction = new Transaction({
      type,
      amount,
      date,
      note,
      paymentMode,
      user: userId,
    });
    if (type === "Payment" || "Credit") {
      switch (paymentMode) {
        case "UPI":
          if (!UPINumber || !transactionId) {
            return res.status(400).json({
              success: false,
              msg: "UPI number and TransactionID is required for UPI payments",
            });
          }
          newTransaction.UPINumber = UPINumber;
          break;
        case "Bank-Transfer":
          if (!bankName || !bankAccountNumber || !transactionId) {
            return res.status(400).json({
              success: false,
              msg: "Account details  and TransactionID are required for bank transfers",
            });
          }

          newTransaction.accountDetails = accountDetails;
          break;
        // Add any other payment modes here if needed
        default:
          break;
      }
    }

    if (type === "Payment") {
      findUser.balance -= amount;
    } else if (type === "Credit") {
      findUser.balance += amount;
    }
    const savedTransaction = await newTransaction.save();
    findUser.transactions.push(savedTransaction._id);

    await findUser.save();
    res.json({
      success: true,
      msg: "Successfully created",
      data: savedTransaction,
    });
  } catch (error) {
    console.log("Errors====> ", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const getAllTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({}).sort({ createdAt: -1 });
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong try again" });
    }
    if (data.length === 0) {
      return res.status(404).json({ success: false, msg: "No data found" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Successfully fetched", data: data });
  } catch (error) {
    console.log("Error====> ", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const findTransaction = await Transaction.findById(id);
    if (!findTransaction) {
      return res.status(404).json({
        success: false,
        msg: "Transaction not found",
      });
    }
    const data = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong try again" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Successfully updated", data: data });
  } catch (error) {
    console.log("Error====> ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const getTransactionByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await Transaction.find({ user: userId })
      .sort({
        createdAt: -1,
      })
      .populate("user")
      .populate("accountDetails");
    if (!data) {
      return res.status(404).json({ success: false, msg: "No data found" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Successfully fetched", data: data });
  } catch (error) {
    console.log("Error====> ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
module.exports = {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  getTransactionByUserId,
};
