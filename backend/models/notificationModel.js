const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["user", "rice"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    riceId: {
      type: Schema.Types.ObjectId,
      ref: "rices",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model("notifications", notificationSchema);
module.exports = Notification;
