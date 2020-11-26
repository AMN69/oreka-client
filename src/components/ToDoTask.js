import React, { useState } from "react";

function ToDoTask(props) {
  const [isDone, setIsDone] = useState(false);

  function handleClick() {
    setIsDone((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <div onClick={handleClick}>
      <p style={{ textDecoration: isDone ? "line-through" : "none" }}/>
        {props.text}
      
    </div>
  );
}

export default ToDoTask;