//  import logo from './logo.svg';
import React, { useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense.js";
import Card from "./components/UI/Card.js";
import ExpensesFilter from "./components/Expenses/ExpensesFilter.js";
import ExpensesList from "./components/Expenses/ExpensesList.js";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

function Apps() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const expensesInDB = await axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/api/v1/user/getExpense",
      });
      const expensesArray = expensesInDB.data.data.userExpense;

      setExpenses(() => {
        return expensesArray;
      });
    };

    fetchData();
  }, []);

  const addExpenseHandler = async (expense) => {
    await axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:4000/api/v1/user/addExpense",
      data: {
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
      },
    });

    const expensesInDB = await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:4000/api/v1/user/getExpense",
    });
    const expensesArray = expensesInDB.data.data.userExpense;

    setExpenses(() => {
      return expensesArray;
    });   
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="logoutbtn"
          onClick={async () => {
            navigate("/register");
            await axios({
              method: "get",
              url: "http://localhost:4000/api/v1/user/logout",
            });
          }}
        >
          logout
        </div>
        <NewExpense onAddExpense={addExpenseHandler} />

        <div>
          <Card className="container">
            <ExpensesFilter />
            <ExpensesList items={expenses} />
          </Card>
        </div>
      </header>
    </div>
  );
}

export default Apps;
