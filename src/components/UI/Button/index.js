import React from "react";
import classes from "./index.module.css";

export default ({btnType, clicked, children}) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

