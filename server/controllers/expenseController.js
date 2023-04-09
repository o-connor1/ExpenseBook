const User = require("../models/userModel");
const Expense = require("./../models/expenseModel");
const AppError = require("./../utils/appError");

exports.addExpense = async (req, res, next) => {
  try {
    const newExpense = await Expense.create(req.body);
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    user.expenseId.push(newExpense._id);
    await user.save({ validateBeforeSave: false });
    res.status(201).json({ status: "success", data: { expense: newExpense } });
  } catch (err) {
    return next(new AppError("Some fields are missing!", 400));
  }
};
exports.getExpense = async (req, res) => {
  try {
    let date = [];
    const mappedObject = new Map();
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    for (let id of user.expenseId) {
      const eachExpense = await Expense.findById(id);
      let eachExpenseDate = eachExpense.date;
      eachExpenseDate.replaceAll("-", "");
      parseInt(eachExpenseDate);
      mappedObject.set(eachExpenseDate, eachExpense);
      date.push(eachExpenseDate);
    }
    date = date.sort();
    date = date.reverse();

    let userExpense = [];

    for (let val of date) {
      const eachExpense = mappedObject.get(val);
      userExpense.push(eachExpense);
    }
    return res.status(200).json({
      status: "success",
      data: {
        userExpense,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
