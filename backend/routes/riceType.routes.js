const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const {
  createRiceType,
  getAllRiceTypes,
  deleteRiceType,
} = require("../controllers/riceTypeController");

const router = Router();

router.post("/", authenticate, createRiceType);
router.get("/", authenticate, getAllRiceTypes);
router.delete("/:id", authenticate, deleteRiceType);

module.exports = router;
