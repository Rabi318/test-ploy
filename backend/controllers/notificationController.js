const Notification = require("../models/notificationModel");

const createNotifications = async (req, res) => {
  try {
    const data = await Notification.create(req.body);
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Successfully created", data: data });
  } catch (error) {
    console.log("error===> ", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
const getAllNotifications = async (req, res) => {
  try {
    const data = await Notification.find({})
      .populate("userId")
      .populate({
        path: "riceId", // Populating riceId
        populate: [
          { path: "userId", select: "firstName lastName mobile village" },
          { path: "adminId", select: "name email" },
          { path: "riceType", select: "name" },
        ],
      })
      .sort({ createdAt: -1 });
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Successfully fetched", data: data });
  } catch (error) {
    console.log("error===> ", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { createNotifications, getAllNotifications };
