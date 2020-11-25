import React, { useState, useEffect } from "react";
import ToDoTask from "../components/ToDoTask";
import services from "../lib/auth-service";

function Places(agenda) {
  const [inputText, setInputText] = useState("");
  const [placesToVisit, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(agenda.placesToVisit)
  }, [agenda.placesToVisit]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addPlace() {
    const newPlaces = {
        placeToVisitDesc: inputText,
        placeToVisitTick: true
    }
      console.log(newPlaces)

    setPlaces((prevPlaces) => {
      return [...prevPlaces, newPlaces];
    });
    setInputText("");
  }

  function deletePlace() {}

  async function handleFormUpdate (event) {
    event.preventDefault();
    console.log("I'm in handleFormUpdate");
    let agenId = agenda._id;
   
    console.log("habits in handleFormUpdate before update: ", placesToVisit);
  
   const response = await services.updateagen(agenId, "placesToVisit", placesToVisit);
    console.log("after update response is: ", response);
    // services.updateagen({ agendaId: res._id, agenda: this.agenda });
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Places To Visit</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addPlace}>
          <span>+</span>
        </button>
      </div>
      <div>
        <ul>
          {placesToVisit.map((todoTask) => (
            <ToDoTask 
            text={todoTask.placeToVisitDesc} 
            onChecked={deletePlace} />
          ))}
        </ul>
        <button onClick={handleFormUpdate}>
            <span>UPDATE PLACE</span>
          </button>
      </div>
    </div>
  );
}

export default Places;
