const Notification = require("../models/notificationModel");
const Rice = require("../models/riceModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, village, mobile } = req.body;
    const findUser = await User.findOne({ mobile: mobile });
    if (findUser) {
      return res.status(409).json({
        success: false,
        msg: "User already exist with the same mobile",
      });
    }
    const data = await User.create({
      firstName,
      lastName,
      mobile,
      village,
    });
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong try again" });
    }
    await Notification.create({
      heading: "New User Added",
      message: `User ${firstName} from ${village} has been added`,
      userId: data._id,
      type: "user",
    });
    res.json({
      success: true,
      msg: "Successfully created",
      data: data,
    });
  } catch (error) {
    console.log("Error====> ", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const data = await User.find({}).sort({ createdAt: -1 });
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
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
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
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the user by ID
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Delete associated transactions
    const transactionDeletion = await Transaction.deleteMany({
      _id: { $in: findUser.transactions },
    });
    if (!transactionDeletion) {
      return res
        .status(500)
        .json({ success: false, msg: "Failed to delete transactions" });
    }

    // Delete associated rice entries
    const deleteRice = await Rice.deleteMany({ userId: id });
    if (!deleteRice) {
      return res
        .status(500)
        .json({ success: false, msg: "Failed to delete rice entries" });
    }

    // Delete the user
    const data = await User.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Failed to delete user" });
    }

    res.json({
      success: true,
      msg: "User and related data successfully deleted",
    });
  } catch (error) {
    console.log("Error====> ", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

// const getAllUserWithTransaction = async (req, res) => {
//   try {

//     const data = await User.aggregate([
//       {
//         $lookup: {
//           from: "transactions", // Collection to join
//           localField: "transactions", // User's transactions field
//           foreignField: "_id", // Transaction's _id field
//           as: "transactionDetails", // Output array of transactions
//         },
//       },
//       {
//         $sort: {
//           date: -1,
//         }, // Sort by createdBy in ascending order
//       },
//       {
//         $project: {
//           firstName: 1,
//           lastName: 1,
//           village: 1,
//           mobile: 1,
//           transactions: "$transactionDetails",
//           balance: 1,
//         },
//       },
//     ]);
//     res.json({
//       success: true,
//       msg: "Successfully fetch the data",
//       data: data,
//     });
//   } catch (error) {
//     console.log("Error====> ", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Internal Server Error",
//     });
//   }
// };
const getAllUserWithTransaction = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $lookup: {
          from: "transactions", // Collection to join
          localField: "transactions", // User's transactions field
          foreignField: "_id", // Transaction's _id field
          as: "transactionDetails", // Output array of transactions
        },
      },
      {
        $unwind: {
          path: "$transactionDetails", // Deconstruct the array
          preserveNullAndEmptyArrays: true, // Preserve users without transactions
        },
      },
      {
        $sort: {
          "transactionDetails.date": 1, // Sort transactions by date in descending order
        },
      },
      {
        $group: {
          _id: "$_id", // Group back to user level
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          village: { $first: "$village" },
          mobile: { $first: "$mobile" },
          transactions: { $push: "$transactionDetails" }, // Push sorted transactions back into an array
          balance: { $first: "$balance" },
          latestTransactionDate: { $first: "$transactionDetails.date" },
        },
      },
      {
        $sort: {
          latestTransactionDate: -1, // Sort users by the most recent transaction date
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          village: 1,
          mobile: 1,
          transactions: 1,
          balance: 1,
        },
      },
    ]);

    res.json({
      success: true,
      msg: "Successfully fetched the data",
      data: data,
    });
  } catch (error) {
    console.log("Error====> ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllUserWithTransaction,
};
