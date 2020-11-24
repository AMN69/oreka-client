import React, { useState, useEffect } from "react";


function Reward(agenda) {
    
    const [reward, setReward] = useState("");
  
    useEffect(() => {
        setReward(agenda.reward)
      }, [agenda.reward]);


    function handleChange(event) {
      const newValue = event.target;
      setReward(newValue);
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
          <h1>Reward</h1>
        </div>
        <div className="form">
          <input 
          onChange={handleChange} 
          type="text" 
          onKeyDown={handleKeyDown}
          value={reward} />
            
        </div>
        <div>
          <ul>
           
          </ul>
        </div>
      </div>
    );
  }
  
  export default Reward;
  
