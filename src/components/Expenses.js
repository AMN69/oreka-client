import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import services from "../lib/auth-service";

function Expenses (agenda) {
  const [expenses, setExpenses] = useState([
    {
        expenseDesc: "",
      expenseAmount: 0
    },
    {
        expenseDesc: "",
        expenseAmount: 0
    },
    {
        expenseDesc: "",
        expenseAmount: 0
    },
    {
        expenseDesc: "",
        expenseAmount: 0
    }
  ]);

  useEffect(() => {
    setExpenses(agenda.expenses)
  }, [agenda.expenses]);
  console.log(agenda.expenses, "DESPUES USEEFFECT AGENDA HABITS")
  function handleChange(event, index) {
    const { name, value } = event.target;
    const newExpenses = [...expenses];
    newExpenses[index] = {
      ...expenses[index],
      [name]: value
    };
    console.log(name, value);
    //if (name === "habitDoneTick") {
      //save on DB
      console.log(newExpenses);
    //}
    setExpenses(newExpenses);
    console.log("DESPUES DE SETHABITS :", expenses);
  }
  function handleKeyDown(event) {
    const { key } = event;
    if (key === "Enter") {
      console.log(expenses);
    }
  }
    async function handleFormUpdate (event) {
      event.preventDefault();
      console.log("I'm in handleFormUpdate");
      let agenId = agenda._id;
      console.log("habits in handleFormUpdate before update: ", expenses);
     const response = await services.updateagen(agenId, "expenses", expenses);
      console.log("after update response is: ", response);
      // services.updateagen({ agendaId: res._id, agenda: this.agenda });
    };
    // const { agenda } = this.props.agenda;
    console.log("I'm in FormCheck children");
    console.log("with agenda: ", agenda);
    const expensesFields = null;
    if (expenses.length < 10) { 
      while (agenda.expenses.length <10){
        agenda.expenses.push({expenseDesc: "", expenseAmount: 0 })
      }}
  return (
    <div className="container">
      <h1>Expenses </h1>
      <form>
        {expenses.length &&
            expenses.map((expenses, index) => (
            <div>
              
              <input
                key={index}
                name="expenseDesc"
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={handleKeyDown}
                placeholder={`Expense ${index + 1}`}
                value={expenses.expenseDesc}
              />
              <input
                 key={index}
                 type="number"
                name="expenseAmount"
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={handleKeyDown}
                placeholder="€"
                value={expenses.expenseAmount}
              />
            </div>
          ))}
            <button onClick={handleFormUpdate}>
            <span>UPDATE EXPENSES</span>
          </button>
      </form>
    </div>
  );
}
export default Expenses;