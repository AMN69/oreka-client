import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import services from "../lib/auth-service";


function Incomes (agenda) {
  const [incomes, setIncomes] = useState([
    {
        incomeDesc: "",
        incomeAmount: 0
    },
    {
        incomeDesc: "",
        incomeAmount: 0
    },
    {
        incomeDesc: "",
        incomeAmount: 0
    },
    {
        incomeDesc: "",
        incomeAmount: 0
    }
  ]);

  useEffect(() => {
    setIncomes(agenda.incomes)
  }, [agenda.incomes]);

  console.log(agenda.incomes, "DESPUES USEEFFECT AGENDA HABITS")
  function handleChange(event, index) {
    const { name, value } = event.target;
    const newIncomes = [...incomes];
    newIncomes[index] = {
      ...incomes[index],
      [name]: value
    };
    console.log(name, value);
    
    setIncomes(newIncomes);
    console.log("DESPUES DE SETHABITS :", incomes);
  }
  function handleKeyDown(event) {
    const { key } = event;
    if (key === "Enter") {
      console.log(incomes);
    }
  }
    async function handleFormUpdate (event) {
      event.preventDefault();
      console.log("I'm in handleFormUpdate");
      let agenId = agenda._id;
      console.log("habits in handleFormUpdate before update: ", incomes);
     const response = await services.updateagen(agenId, "incomes", incomes);
      console.log("after update response is: ", response);
      // services.updateagen({ agendaId: res._id, agenda: this.agenda });
    };
    // const { agenda } = this.props.agenda;
    console.log("I'm in FormCheck children");
    console.log("with agenda: ", agenda);
    const incomesFields = null;
    if (incomes.length && incomes.length < 4) { 
      while (agenda.incomes.length <4){
        agenda.incomes.push({incomeDesc: "", incomeAmount: 0 })
      }}
  return (
    <div className="container">
      <h1>Incomes </h1>
      <form>
        {incomes.length &&
            incomes.map((incomes, index) => (
            <div>
            <input
                key={index}
                name="incomeDesc"
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={handleKeyDown}
                placeholder={`Income ${index + 1}`}
                value={incomes.incomeDesc}
              />
              <input
                key={index}
                type="number"
                name="incomeAmount"
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={handleKeyDown}
                placeholder="€"
                value={incomes.incomeAmount}
              />
            </div>
          ))}
            <button onClick={handleFormUpdate}>
            <span>UPDATE INCOMES</span>
          </button>
      </form>
    </div>
  );
}
export default Incomes;