import React from "react";
import classes from "./index.module.css";

const drawerToggel = props => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div />
      <div /> 
      <div />
    </div>
  );
};

export default drawerToggel;
