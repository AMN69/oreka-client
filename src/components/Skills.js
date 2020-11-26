import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import services from "../lib/auth-service";
function Skills(agenda) {
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
  async function handleFormUpdate (event) {
    event.preventDefault();
    console.log("I'm in handleFormUpdate");
    let agenId = agenda._id;
    console.log("habits in handleFormUpdate before update: ", skills);
   const response = await services.updateagen(agenId, "skills", skills);
    console.log("after update response is: ", response);
    // services.updateagen({ agendaId: res._id, agenda: this.agenda });
  };
  // const { agenda } = this.props.agenda;
  console.log("I'm in FormCheck children");
  console.log("with agenda: ", agenda);
  const skillsFields = null;
    if (skills.length < 4) { 
      while (agenda.skills.length <4){
        agenda.skills.push({skillDoneTick: false, skillToDoDesc: "" })
      }}
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
                checked={skill.skillDoneTick}
              />
              <input
                key={index}
                name="skillToDoDesc"
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={handleKeyDown}
                placeholder={`Skill ${index + 1}`}
                value={skill.skillToDoDesc}
              />
            </div>
          ))}
          <button onClick={handleFormUpdate}>
            <span>UPDATE SKILLS</span>
          </button>
      </form>
    </div>
  );
}
export default Skills;