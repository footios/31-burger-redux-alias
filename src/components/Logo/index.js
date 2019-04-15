import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./index.module.css";

// child of Toolbar

export default () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="MyBurger" />
    </div>
  );
};

