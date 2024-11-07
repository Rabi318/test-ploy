const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const {
  createTransaction,
  getAllTransactions,
  getTransactionByUserId,
} = require("../controllers/transactionController");

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(["transactionAdd", "all"]),
  createTransaction
);
router.get(
  "/",
  authenticate,
  authorize(["all", "transactionView"]),
  getAllTransactions
);
router.get(
  "/by-user/:id",
  authenticate,
  authorize(["all", "transactionView"]),
  getTransactionByUserId
);

module.exports = router;
