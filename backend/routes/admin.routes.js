const { Router } = require("express");
const { createAdmin, loginAdmin } = require("../controllers/adminController");
const upload = require("../middleware/multer.middleware");

const router = Router();

router.post("/", upload.fields([{ name: "photo", maxCount: 1 }]), createAdmin);
router.post("/login", loginAdmin);

module.exports = router;
