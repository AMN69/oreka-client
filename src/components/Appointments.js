import React, { useState, useEffect } from "react";
import ToDoTask from "../components/ToDoTask";

function Appointments(agenda) {
    const [inputText, setInputText] = useState("");
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        setAppointments(agenda.appointments)
      }, [agenda.appointments]);
  
    function handleChange(event) {
      const newValue = event.target.value;
      setInputText(newValue);
    }
  
    function addAppointment() {
      const newAppointments = {
        appointmentDesc: inputText,
        appointmentTick: true
      }
      console.log(newAppointments)
  
      setAppointments((prevAppointments) => {
        return [...prevAppointments, newAppointments];
      });
      setInputText("");
    }
  
    function deleteAppointment() {}
  
    return (
      <div className="container">
        <div className="heading">
          <h1>Appointments</h1>
        </div>
        <div className="form">
          <input onChange={handleChange} type="text" value={inputText} />
          <button onClick={addAppointment}>
            <span>+</span>
          </button>
        </div>
        <div>
          <ul>
            {appointments.map((todoTask) => (
              <ToDoTask 
              text={todoTask.appointmentDesc} 
              onChecked={deleteAppointment} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  export default Appointments;
  