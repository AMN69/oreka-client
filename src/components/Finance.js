import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


function Finance(agenda) {
  //cambiar valores a finance!
  const [finance, setFinance] = useState({
    habit1: "",
    habit2: "",
    habit3: "",
    habit4: ""
  });

  useEffect(() => {
    setFinance(agenda.finance)
  }, [agenda.finance]);

  function handleChange(event) {
    const newValue = event.target.value;
    const inputFinance = event.target.name;
//cambiar valores a finance!!!
    setFinance((prevValue) => {
      if (inputFinance === "habit1") {
        return {
          habit1: newValue,
          habit2: prevValue.habit2,
          habit3: prevValue.habit3,
          habit4: prevValue.habit4
        };
      } else if (inputFinance === "habit2") {
        return {
          habit1: prevValue.habit1,
          habit2: newValue,
          habit3: prevValue.habit3,
          habit4: prevValue.habit4
        };
      } else if (inputFinance === "habit3") {
        return {
          habit1: prevValue.habit1,
          habit2: prevValue.habit2,
          habit3: newValue,
          habit4: prevValue.habit4
        };
      } else {
        return {
          habit1: prevValue.habit1,
          habit2: prevValue.habit2,
          habit3: prevValue.habit3,
          habit4: newValue
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>Finance </h1>
      <h2> Incomes </h2>
      <form>
        <div>
          <input
            name="incomeDesc"
            onChange={handleChange}
            placeholder="Income Concept 1"
            //value={habits.habit1}
          />
          <input
            name="incomeAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="incomeDesc"
            onChange={handleChange}
            placeholder="Income Concept 2"
            //value={habits.habit1}
          />
          <input
            name="incomeAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="incomeDesc"
            onChange={handleChange}
            placeholder="Income Concept 3"
            //value={habits.habit1}
          />
          <input
            name="incomeAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
      </form>

      <h2> Expenses </h2>
      <form>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 1"
            //value={finance.habit1}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 2"
            //value={habits.habit2}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 3"
            //value={habits.habit3}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 4"
            //value={habits.habit3}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 5"
            //value={habits.habit3}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 6"
            //value={habits.habit3}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 7"
            //value={habits.habit3}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 8"
            //value={habits.habit3}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 9"
            //value={habits.habit3}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
        <div>
          <input
            name="expenseDesc"
            onChange={handleChange}
            placeholder="Expense Concept 10"
            //value={habits.habit3}
          />
          <input
            name="expenseAmount"
            onChange={handleChange}
            placeholder="€"
            //value={habits.habit1}
          />
        </div>
      </form>
      <h2> Balance </h2>
      <form>
        <input
          name="balance"
          onChange={handleChange}
          placeholder="Monthly total balance"
          //value={habits.habit1}
        />
      </form>
    </div>
  );
}

export default Finance;

