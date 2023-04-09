import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {

  let expensesContent = (
    <h2 className="expenses-list__fallback">Found no expenses.</h2>
  );
 console.log(props.items)
  if (props.items && props.items.length > 0) {
    expensesContent = props.items.map((each_expense) => (
      <ExpenseItem
        title={each_expense.title}
        amount={each_expense.amount}
        date={each_expense.date}
      />
    ));
  }
  return <ul className="expenses-list">{expensesContent}</ul>;
};

export default ExpensesList;
