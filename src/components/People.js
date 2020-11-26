import React, { useState, useEffect } from "react";
import ToDoTask from "../components/ToDoTask";
import services from "../lib/auth-service";

function People(agenda) {
    const [inputText, setInputText] = useState("");
    const [peopleToMeet, setPeoples] = useState([]);

    useEffect(() => {
      setPeoples(agenda.peopleToMeet)
    }, [agenda.peopleToMeet]);
  
    function handleChange(event) {
      const newValue = event.target.value;
      setInputText(newValue);
    }
  
    function addPeople() {
      const newPeople = {
        personToMeetDesc: inputText,
        personToMeetTick: true
      };
      console.log(newPeople);
  
      setPeoples((prevPeoples) => {
        return [...prevPeoples, newPeople];
      });
      setInputText("");
    }
  
    function deletePeople() {}
  
    async function handleFormUpdate (event) {
      event.preventDefault();
      console.log("I'm in handleFormUpdate");
      let agenId = agenda._id;
     
      console.log("habits in handleFormUpdate before update: ", peopleToMeet);
    
     const response = await services.updateagen(agenId, "peopleToMeet", peopleToMeet);
      console.log("after update response is: ", response);
      // services.updateagen({ agendaId: res._id, agenda: this.agenda });
    };
    return (
      <div className="container">
        <div className="heading">
          <h1>People To See</h1>
        </div>
        <div className="form">
          <input onChange={handleChange} type="text" value={inputText} />
          <button onClick={addPeople}>
            <span>+</span>
          </button>
        </div>
        <div>
        <ul>
            {peopleToMeet.map((todoTask) => (
              <ToDoTask
                text={todoTask.personToMeetDesc}
                onChecked={deletePeople}
              />
            ))}
            </ul>
            <br/>
            <br/>
          
          <button onClick={handleFormUpdate}>
            <span>UPDATE PEOPLE</span>
          </button>
        </div>
      </div>
    );
  }
  
  export default People;
  
