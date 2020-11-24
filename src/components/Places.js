import React, { useState, useEffect } from "react";
import ToDoTask from "../components/ToDoTask";

function Places(agenda) {
  const [inputText, setInputText] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(agenda.places)
  }, [agenda.places]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addPlace() {
    const newPlaces = {
        placeToVisit: inputText,
        placeToVisitTick: true
    }
      console.log(newPlaces)

    setPlaces((prevPlaces) => {
      return [...prevPlaces, newPlaces];
    });
    setInputText("");
  }

  function deleteTask() {}

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
          {places.map((todoTask) => (
            <ToDoTask 
            text={todoTask.placeToVisit} 
            onChecked={deleteTask} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Places;
