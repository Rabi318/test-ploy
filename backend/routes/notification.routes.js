const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const {
  notificationCreateValidation,
} = require("../validation/notificationValidation");
const { validate } = require("../models/notificationModel");
const {
  createNotifications,
  getAllNotifications,
} = require("../controllers/notificationController");

const router = Router();

router.post(
  "/",
  authenticate,
  notificationCreateValidation,
  validate,
  createNotifications
);
router.get("/", getAllNotifications);
module.exports = router;
