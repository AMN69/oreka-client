import React, { useState, useEffect } from "react";
import ToDoTask from "../components/ToDoTask";
import services from "../lib/auth-service";

function Appointments(agenda) {
    const [inputText, setInputText] = useState("");
    const [appointments, setAppointments] = useState([]);
    
    // useEffect(() => {
    //     if (agenda.appointments[0].appointmentDesc != "") {
    //       setAppointments(agenda.appointments)
    //     } else {
    //       for (let i = 0; i < appointments.length; i++) {
    //         appointments.splice(0, 1);
    //       }
    //     }
    //   }, [agenda.appointments]);

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

    async function handleFormUpdate (event) {
    event.preventDefault();
    console.log("I'm in handleFormUpdate");
    let agenId = agenda._id;
   
    console.log("habits in handleFormUpdate before update: ", appointments);
  
   const response = await services.updateagen(agenId, "appointments", appointments);
    console.log("after update response is: ", response);
    // services.updateagen({ agendaId: res._id, agenda: this.agenda });
  };

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
            <br/>
          </ul>
          <button onClick={handleFormUpdate}>
            <span>UPDATE APPOINTMENTS</span>
          </button>
        </div>
      </div>
    );
  }
  export default Appointments;
  





