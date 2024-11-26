const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "superAdmin"],
      default: "admin",
    },
    photo: {
      type: String,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    permission: {
      userAdd: { type: Boolean, default: false },
      userUpdate: { type: Boolean, default: false },
      userDelete: { type: Boolean, default: false },
      userView: { type: Boolean, default: false },

      riceAdd: { type: Boolean, default: false },
      riceUpdate: { type: Boolean, default: false },
      riceDelete: { type: Boolean, default: false },
      riceView: { type: Boolean, default: false },

      all: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  if (this.role === "admin") {
    this.permission.userAdd = true;
    this.permission.userView = true;
    this.permission.riceAdd = true;
    this.permission.riceView = true;
  }
  next();
});

const Admin = model("admins", adminSchema);
module.exports = Admin;
