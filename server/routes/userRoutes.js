const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  isLogin,
  logout,
} = require("./../controllers/authController");
const {
  addExpense,
  getExpense,
} = require("./../controllers/expenseController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);

router.route("/addExpense").post(isLogin, addExpense);
router.route("/getExpense").get(isLogin, getExpense);

module.exports = router;
