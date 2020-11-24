import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import ToDoTask from "../components/ToDoTask";

//peopleToMeet: [{
// personToMeetDesc: String
//}],

function FormBullet() {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addTask() {
    setTasks((prevTasks) => {
      return [...prevTasks, inputText];
    });
    setInputText("");
  }

  function deleteTask() {}

  return (
    <div className="container">
      <div className="heading">
        <h1>People To Meet</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} 
        type="text" 
        value={inputText} />
        <button onClick={addTask}>
          <span>+</span>
        </button>
      </div>
      <div>
        <ul>
          {tasks.map((ToDoTask) => (
            <ToDoTask text={ToDoTask} onChecked={deleteTask} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FormBullet;
