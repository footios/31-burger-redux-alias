import React from "react";
import classes from "./index.module.css";

export default ({btnType, clicked, children, disabled}) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

