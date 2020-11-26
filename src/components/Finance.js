import React, { useState, useEffect } from "react";
import services from "../lib/auth-service";



function Finance(agenda) {
  const [finance, setFinance] = useState([
    [
          {
          incomeDesc: "",
          incomeAmount: 0
          }   
    ],
    [
    {
          expenseDesc: "",
          expenseAmount: 0
          }  
    ]
],);

  



  useEffect(() => {
   setFinance(agenda.finance);
  }, [agenda.finance]);

  


  function handleChange(event, index, financeIndex) {
    const { name, value } = event.target;
    const newFinance = [...finance];
    newFinance[financeIndex][index] = {
      ...newFinance[financeIndex][index],
      [name]: value
    };

    setFinance(newFinance);
  }

  
 
  function handleKeyDown(event) {
    /*^const { key } = event;
    if (key === "Enter") {
      console.log(finance);
    }*/
  }
  


  async function handleFormUpdate (event) {
    event.preventDefault();
    console.log("I'm in handleFormUpdate");
    let agenId = agenda._id;
   
    console.log("habits in handleFormUpdate before update: ", finance);
   
   const response = await services.updateagen(agenId, "finance", finance);
    console.log("after update response is: ", response);
    // services.updateagen({ agendaId: res._id, agenda: this.agenda });
  };


    if (finance.length && finance.length < 5) { 
      while (finance[0].length <5){
       finance[0].push({incomeDesc: "", incomeAmount: "" })
    
      }}


     if (finance[1] && finance.length && finance[1].length < 10) { 
        while (finance[1].length <10){
         finance[1].push({expenseDesc: "", expenseAmount: "" })
      
        }}
        console.log(finance)

  return (
    <div className="container">
      <h1>Finance </h1>
      <h2> Incomes </h2>
      <form>
          {finance[0].length &&
            finance[0].map((income, index) => (
              <section>
                <input
                  key={index}
                  name="incomeDesc"
                  onChange={(e) => {
                    handleChange(e, index, 0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={`Finance ${index + 1}`}
                  value={income.incomeDesc}
                />

                <input
                  key={index}
                  type= "number"
                  name="incomeAmount"
                  onChange={(e) => {
                    handleChange(e, index, 0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={`Finance[0] ${index + 1}`}
                  value={income.incomeAmount}
                />
            </section>
            ))
          }
          <button onClick={handleFormUpdate}>
            <span>UPDATE FINANCE</span>
          </button>
      </form>
            
      <h2> Expenses </h2>
        <form>
        {finance[1] && finance[1].length &&
            finance[1].map((expense, index) => (
          <div>
            <input
              name="expenseDesc"
              onChange={(e) => {
                    handleChange(e, index, 1);
                  }}
              placeholder="Expense Concept 1"
              value={expense.expenseDesc}
            />
            <input
              name="expenseAmount"
              type= "number"
              onChange={(e) => {
                    handleChange(e, index, 1);
                  }}
              placeholder="€"
              value={expense.expenseAmount}
            />
          </div>
            ))
        }
          
          
        </form>
    </div>
    
    
  );
}

export default Finance;
