const Rice = require("../models/riceModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const createRiceEntry = async (req, res) => {
  try {
    const { userId, weights, riceType, total, plasticSacks } = req.body;
    const admin = req.admin.id;
    // console.log("Admin id ===>", admin);
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    const data = await Rice.create({
      userId,
      adminId: admin,
      weights,
      riceType,
      plasticSacks,
      total,
    });
    if (!data) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong try again",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Successfully created",
      data: data,
    });
  } catch (error) {
    console.log("Errors====> ", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const getAllRiceEntries = async (req, res) => {
  try {
    const data = await Rice.find({})
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("adminId")
      .populate("riceType");
    if (!data) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong try again",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Successfully fetched",
      data: data,
    });
  } catch (error) {
    console.log("Error====> ", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const updateRiceEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Rice.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong try again",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Successfully updated",
      data: data,
    });
  } catch (error) {
    console.log("Error====> ", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const calculateTotalAmount = async (req, res) => {
  try {
    const {
      sacksPrice,
      quintalPrice,
      subFinalPrice,
      finalPrice,
      userId,
      riceId,
    } = req.body;
    if (!quintalPrice || !subFinalPrice || !finalPrice || !userId || !riceId) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const riceEntry = await Rice.findById(riceId);

    if (!riceEntry) {
      return res.status(404).json({
        success: false,
        msg: "Rice entry not found",
      });
    }
    riceEntry.sacksPrice = sacksPrice || riceEntry.sacksPrice;
    riceEntry.quintalPrice = quintalPrice || riceEntry.quintalPrice;
    riceEntry.subFinalPrice = subFinalPrice || riceEntry.subFinalPrice;
    riceEntry.finalPrice = finalPrice || riceEntry.finalPrice;
    riceEntry.calculated = true;

    // Save the updated entry
    const updatedRiceEntry = await riceEntry.save();
    if (!updatedRiceEntry) {
      return res
        .status(500)
        .json({ success: false, msg: "Failed to update rice entry" });
    }

    // Update the user's total amount
    findUser.balance += updatedRiceEntry.finalPrice;
    await findUser.save();
    res.status(200).json({
      success: true,
      msg: "Successfully updated",
      data: updatedRiceEntry,
    });
  } catch (error) {
    console.log("Error====> ", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const getRiceByUserId = async (req, res) => {
  try {
    const userId = req.params;

    // console.log("userId ===>", userId);
    // Check if the provided userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid userId",
      });
    }

    const findRice = await Rice.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (findRice.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "Rice not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Successfully fetched",
      data: findRice,
    });
  } catch (error) {
    console.log("Error====> ", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
module.exports = {
  createRiceEntry,
  getAllRiceEntries,
  updateRiceEntry,
  calculateTotalAmount,
  getRiceByUserId,
};
