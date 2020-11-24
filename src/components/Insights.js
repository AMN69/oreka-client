import React, { useState, useEffect } from "react";


function Insights(agenda) {
    
    const [insights, setInsights] = useState("");

    useEffect(() => {
        setInsights(agenda.insights)
      }, [agenda.insights]);
  
    function handleChange(event) {
      const newValue = event.target;
      setInsights(newValue);
    }

    function handleKeyDown(event) {
        const { key } = event;
    
        if (key === "Enter") {
          console.log(skills);
        }
      }
  
    return (
      <div className="container">
        <div className="heading">
          <h1>Monthly Insights</h1>
        </div>
        <div className="form">
          <input 
          onChange={setInsights} 
          type="text" 
          onKeyDown={handleKeyDown}
          value={insights} />
            
        </div>
        <div>
          <ul>
           
          </ul>
        </div>
      </div>
    );
  }
  
  export default Insights;
  
