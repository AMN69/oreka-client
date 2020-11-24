import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
//skills: [{
//  skillToDoDesc: String,
//  skillDoneTick: Boolean//
//}],


function FormSkills(agenda) {
  const [skills, setSkills] = useState([
    {
      skillToDoDesc: "",
      skillDoneTick: false
    },
    {
      skillToDoDesc: "",
      skillDoneTick: false
    },
    {
      skillToDoDesc: "",
      skillDoneTick: false
    },
    {
      skillToDoDesc: "",
      skillDoneTick: false
    }
  ]);

  useEffect(() => {
    setSkills(agenda.skills)
  }, [agenda.skills]);

  function handleChange(event, index) {
    const { name, value } = event.target;

    const newSkills = [...skills];
    newSkills[index] = {
      ...skills[index],
      [name]: value
    };
    console.log(name, value);

    if (name === "skillDoneTick") {
      //save on DB
      console.log(newSkills);
    }

    setSkills(newSkills);
  }

  function handleKeyDown(event) {
    const { key } = event;

    if (key === "Enter") {
      console.log(skills);
    }
  }

  return (
    <div className="container">
      <h1>Skills To Learn </h1>
      <form>
        {skills.length &&
          skills.map((skill, index) => (
            <div>
              <input
                type="checkbox"
                name="skillDoneTick"
                value={!skill.skillDoneTick}
                onChange={(e) => {
                  handleChange(e, index);
                }}
              />
              <input
                key={index}
                name="skillToDoDesc"
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={handleKeyDown}
                placeholder={`Skill ${index + 1}`}
                value={skills.skillToDoDesc}
              />
            </div>
          ))}
      </form>
    </div>
  );
}

export default FormSkills;
