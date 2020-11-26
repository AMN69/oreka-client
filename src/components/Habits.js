import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import services from "../lib/auth-service";
function Habits (agenda) {
  const [habits, setHabits] = useState([
    {
      habitToDoDesc: "",
      habitDoneTick: false
    },
    {
      habitToDoDesc: "",
      habitDoneTick: false
    },
    {
      habitToDoDesc: "",
      habitDoneTick: false
    },
    {
      habitToDoDesc: "",
      habitDoneTick: false
    }
  ]);
  useEffect(() => {
    setHabits(agenda.habits)
  }, [agenda.habits]);
  console.log(agenda.habits, "DESPUES USEEFFECT AGENDA HABITS")
  function handleChange(event, index) {
    const { name, value } = event.target;
    const oldHabits = [...habits];
    oldHabits[index] = {
      ...habits[index],
      [name]: value
    };
    console.log(name, value);
    if (name === "habitDoneTick") {
      //save on DB
      console.log(oldHabits);
    }
    setHabits(oldHabits);
    console.log("DESPUES DE SETHABITS :", habits);
  }
  function handleKeyDown(event) {
    const { key } = event;
    if (key === "Enter") {
      console.log(habits);
    }
  }
    async function handleFormUpdate (event) {
      event.preventDefault();
      console.log("I'm in handleFormUpdate");
      let agenId = agenda._id;
      console.log("habits in handleFormUpdate before update: ", habits);
     const response = await services.updateagen(agenId, "habits", habits);
      console.log("after update response is: ", response);
      // services.updateagen({ agendaId: res._id, agenda: this.agenda });
    };
    // const { agenda } = this.props.agenda;
    console.log("I'm in FormCheck children");
    console.log("with agenda: ", agenda);
    const habitsFields = null;
    if (habits.length < 4) { 
      while (agenda.habits.length <4){
        agenda.habits.push({habitDoneTick: false, habitToDoDesc: "" })
      }}
  return (
    <div className="container">
      <h1>Habits To Adopt </h1>
      <form>
        {habits.length &&
          habits.map((habit, index) => (
            <div>
              <input
                type="checkbox"
                name="habitDoneTick"
                value={!habit.habitDoneTick}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                checked={habit.habitDoneTick}
              />
              <input
                key={index}
                name="habitToDoDesc"
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={handleKeyDown}
                placeholder={`Habit ${index + 1}`}
                value={habit.habitToDoDesc}
              />
            </div>
          ))}
            <button onClick={handleFormUpdate}>
            <span>UPDATE HABITS</span>
          </button>
      </form>
    </div>
  );
}
export default Habits;