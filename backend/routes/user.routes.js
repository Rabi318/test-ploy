const { Router } = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllUserWithTransaction,
} = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = Router();

router.post("/", authenticate, authorize(["userAdd", "all"]), createUser);
router.get("/", authenticate, authorize(["userView", "all"]), getAllUsers);
router.get(
  "/transactions",
  authenticate,
  authorize(["all", "transactionView"]),
  getAllUserWithTransaction
);
router.put("/:id", authenticate, authorize(["all", "userUpdate"]), updateUser);
router.delete(
  "/:id",
  authenticate,
  authorize(["all", "userDelete"]),
  deleteUser
);

module.exports = router;
