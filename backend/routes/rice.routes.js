const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const {
  createRiceEntry,
  getAllRiceEntries,
  updateRiceEntry,
  calculateTotalAmount,
  getRiceByUserId,
} = require("../controllers/riceController");

const router = Router();

router.post("/", authenticate, authorize(["riceAdd", "all"]), createRiceEntry);
router.post(
  "/calculate",
  authenticate,
  authorize(["all", "riceCalculate"]),
  calculateTotalAmount
);
router.get(
  "/",
  authenticate,
  authorize(["all", "riceView"]),
  getAllRiceEntries
);
router.get("/by-user/:id", getRiceByUserId);
router.put(
  "/:id",
  authenticate,
  authorize(["all", "riceUpdate"]),
  updateRiceEntry
);

module.exports = router;
