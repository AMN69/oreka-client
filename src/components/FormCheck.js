import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState } from "react";


function FormCheck() {
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
      </form>
    </div>
  );
}

export default FormCheck;
