import React, { useState, useEffect } from "react";
import services from "../lib/auth-service";

function Insights(agenda) {
    
    const [insights, setInsights] = useState("");
  
    useEffect(() => {
      setInsights(agenda.insights)
      }, [agenda.insights]);


    function handleChange(event) {
      const newValue = event.target.value;
      setInsights(newValue);
    }

    function handleKeyDown(event) {
        const { key } = event;
    
        if (key === "Enter") {
          console.log(insights);
        }
      }
    
    async function handleFormUpdate (event) {
        event.preventDefault();
        console.log("I'm in handleFormUpdate");
        let agenId = agenda._id;
       
        console.log("habits in handleFormUpdate before update: ", insights);
      
       const response = await services.updateagen(agenId, "insights", insights);
        console.log("after update response is: ", response);
        // services.updateagen({ agendaId: res._id, agenda: this.agenda });
      };
  
    return (
      <div className="container">
        <div className="heading">
          <h1>Insights</h1>
        </div>
        <form>
          <textarea 
          name="insights"
          onChange={handleChange} 
          type="textarea" 
          placeholder="Write here your Insights"
          onKeyDown={handleKeyDown}
          value={insights} />
          <button onClick={handleFormUpdate}>
            <span>UPDATE INSIGHTS</span>
          </button>
        </form>
     
        
      </div>
    );
  }
  
  export default Insights;
  
