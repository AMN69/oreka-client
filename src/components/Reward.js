import React, { useState, useEffect } from "react";
import services from "../lib/auth-service";

function Reward(agenda) {
    
    const [reward, setReward] = useState("");
  
    useEffect(() => {
        setReward(agenda.reward)
      }, [agenda.reward]);


    function handleChange(event) {
      const newValue = event.target.value;
      setReward(newValue);
    }

    function handleKeyDown(event) {
        const { key } = event;
    
        if (key === "Enter") {
          console.log(reward);
        }
      }
    
    async function handleFormUpdate (event) {
        event.preventDefault();
        console.log("I'm in handleFormUpdate");
        let agenId = agenda._id;
       
        console.log("habits in handleFormUpdate before update: ", reward);
      
       const response = await services.updateagen(agenId, "reward", reward);
        console.log("after update response is: ", response);
        // services.updateagen({ agendaId: res._id, agenda: this.agenda });
      };
  
    return (
      <div className="container">
        <div className="heading">
          <h1>Reward</h1>
        </div>
        <form>
          <textarea 
          name="reward"
          onChange={handleChange} 
          type="textarea" 
          placeholder="Write here your reward"
          onKeyDown={handleKeyDown}
          value={reward} />
          <button onClick={handleFormUpdate}>
            <span>UPDATE REWARD</span>
          </button>
        </form>
     
        
      </div>
    );
  }
  
  export default Reward;
  
