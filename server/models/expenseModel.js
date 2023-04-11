const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please specify the product name!"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Please provide the purchase cost!"],
  },
  date: {
    type: String,
    required: [true, "Please specify the purchase date!"],
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
