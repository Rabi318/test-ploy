const RiceType = require("../models/riceTypeModel");

const createRiceType = async (req, res) => {
  try {
    const { name } = req.body;
    const findRiceType = await RiceType.findOne({ name: name });
    if (findRiceType) {
      return res
        .status(409)
        .json({ success: false, msg: "Rice Type already exist" });
    }
    const data = await RiceType.create({ name });
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong try again" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Successfully created", data: data });
  } catch (error) {
    console.log("Error====> ", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

const getAllRiceTypes = async (req, res) => {
  try {
    const data = await RiceType.find({}).sort({ createdAt: -1 });
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong try again" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Successfully fetched", data: data });
  } catch (error) {
    console.log("Error====> ", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

const deleteRiceType = async (req, res) => {
  try {
    const id = req.params.id;
    const findRiceType = await RiceType.findById(id);
    if (!findRiceType) {
      return res
        .status(404)
        .json({ success: false, msg: "Rice Type not found" });
    }
    const data = await RiceType.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong try again" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Successfully deleted", data: data });
  } catch (error) {
    console.log("Error====> ", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = {
  createRiceType,
  getAllRiceTypes,
  deleteRiceType,
};
