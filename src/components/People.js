import React, { useState, useEffect } from "react";

import ToDoTask from "./ToDoTask";


//peopleToMeet: [{
// personToMeetDesc: String
//}],


function People(agenda) {
    const [inputText, setInputText] = useState("");
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
      setPeoples(agenda.peoples)
    }, [agenda.peoples]);
  
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
            {peoples.map((todoTask) => (
              <ToDoTask
                text={todoTask.personToMeetDesc}
                onChecked={deletePeople}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  export default People;
  
