import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import services from "../lib/auth-service";

function FormCheck(agenda) {
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

  /* habits: [{
    habitToDoDesc: String,
    habitDoneTick: Boolean
}],
*/

  // useEffect(() => {
  //   console.log("I'm in useEffect children")
  //   return () => { this.props.parentMethod(agenda); }
  // }, [] );

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
  }

  function handleKeyDown(event) {
    const { key } = event;

    if (key === "Enter") {
      console.log(habits);
    }
  }

  function handleFormUpdate (event) {
    event.preventDefault();
    console.log("I'm in handleFormUpdate");
    let agenId = this.props.agenda._id;
    agenda.reward = "It's been updated succesfully three times."
    console.log("agenda in handleFormUpdate before update: ", agenda);
    console.log("agenda reward: ", agenda.reward);
    const response = services.updateagen({agenId, habits});
    console.log("after update response is: ", response);
    // services.updateagen({ agendaId: res._id, agenda: this.agenda });
  };

  // const { agenda } = this.props.agenda;
  console.log("I'm in FormCheck children");
  console.log("with agenda: ", agenda);
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
              />
              <input
                key={index}
                name="habitToDoDesc"
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={handleKeyDown}
                placeholder={`Habit ${index + 1}`}
                value={habits.habitToDoDesc}
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

export default FormCheck;
