import React from "react";
import classes from "./Backdrop.module.css";

export default ({show, clicked}) => {
  return show ? (
    <div className={classes.Backdrop} onClick={clicked} />
  ) : null;
};


