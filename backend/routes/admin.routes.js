const { Router } = require("express");
const {
  createAdmin,
  loginAdmin,
  changePassword,
  getAllAdmins,
  sendEmail,
  updateAdmin,
} = require("../controllers/adminController");
const upload = require("../middleware/multer.middleware");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = Router();
router.post("/send-email", sendEmail);
router.post("/login", loginAdmin);
router.post(
  "/",
  upload.fields([{ name: "photo", maxCount: 1 }]),
  authenticate,
  authorize(["adminAdd", "all"]),
  createAdmin
);

router.post("/change-password", authenticate, changePassword);
router.get("/get-admins", getAllAdmins);

router.put(
  "/:id",
  authenticate,
  authorize(["all", "adminUpdate"]),
  updateAdmin
);

module.exports = router;
