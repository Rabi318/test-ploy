const Admin = require("../models/adminModel");
const { setPasswordEmail } = require("../services/emailServices");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenService");

const createAdmin = async (req, res) => {
  try {
    const { name, username, email, mobile } = req.body;
    const findAdmin = await Admin.findOne({ email: email });
    if (findAdmin) {
      return res.status(409).json({
        success: false,
        msg: "Already register with this email",
      });
    }
    const findAdmin2 = await Admin.findOne({ username: username });
    if (findAdmin2) {
      return res.status(409).json({
        success: false,
        msg: "Username already in use",
      });
    }
    const findAdmin3 = await Admin.findOne({ mobile: mobile });
    if (findAdmin3) {
      return res.status(409).json({
        success: false,
        msg: "Mobile number already in use",
      });
    }
    const otp = Math.floor(Math.random() * 999999).toString();
    const hashedPassword = await bcrypt.hash(otp, 10);
    const photo = req.files["photo"] ? req.files["photo"][0].path : null;
    const cloudPhoto = await uploadOnCloudinary(photo);

    const sendMail = await setPasswordEmail(email, name, otp, username);

    const data = await Admin.create({
      name,
      email,
      mobile,
      username,
      photo: cloudPhoto.url,
      password: hashedPassword,
    });
    if (!data) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong",
      });
    }

    res.json({
      success: true,
      msg: "Successfully registered",
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
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findAdmin = await Admin.findOne({ username: username });
    if (!findAdmin) {
      return res.status(404).json({
        success: false,
        msg: "Admin not Found",
      });
    }
    const matchPassowrd = await bcrypt.compare(password, findAdmin.password);
    if (!matchPassowrd) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Password",
      });
    }
    //*get permissions which is true
    const truePermissions = Object.keys(findAdmin.permission).reduce(
      (acc, key) => {
        if (findAdmin.permission[key]) {
          acc[key] = true;
        }
        return acc;
      },
      {}
    );
    const loggedInAdmin = await Admin.findById(findAdmin._id)
      .select("-password")
      .select("-username");
    const payload = {
      id: loggedInAdmin._id,
      role: loggedInAdmin.role,
      permissions: truePermissions,
    };
    const token = await generateToken(payload);
    if (!token) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong",
      });
    }
    res.json({
      success: true,
      msg: "Login Successfully",
      data: loggedInAdmin,
      token: token,
    });
  } catch (error) {
    console.log("Error====> ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { id, currentPassword, newPassword } = req.body;
    const findAdmin = await Admin.findById(id);
    if (!findAdmin) {
      return res.status(404).json({
        success: false,
        msg: "Admin not Found",
      });
    }
    const matchPassowrd = await bcrypt.compare(
      currentPassword,
      findAdmin.password
    );
    if (!matchPassowrd) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Password",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const data = await Admin.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    if (!data) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong",
      });
    }
    res.json({
      success: true,
      msg: "Password changed Successfully",
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
const getAllAdmins = async (req, res) => {
  try {
    const data = await Admin.find({ role: "admin" }).sort({ createdAt: -1 });
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No admins found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Successfully fetched admins",
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
const sendEmail = async (req, res) => {
  try {
    const { email, name, otp } = req.body;
    const sendMail = await setPasswordEmail(email, name, otp);
    if (!sendMail) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Email sent successfully",
    });
  } catch (error) {
    console.log("Error===> ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const findAdmin = await Admin.findById(id);
    if (!findAdmin) {
      return res.status(404).json({
        success: false,
        msg: "Admin not found",
      });
    }
    const data = await Admin.findByIdAndUpdate(id, req.body, { new: true });
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
    console.log("Error===> ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
module.exports = {
  createAdmin,
  loginAdmin,
  changePassword,
  getAllAdmins,
  sendEmail,
  updateAdmin,
};
