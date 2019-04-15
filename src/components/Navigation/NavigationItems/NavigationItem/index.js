import React from "react";
import classes from "./index.module.css";

export default ({active, link, children}) => {
  return (
    <li className={classes.NavigationItem}>
      <a href={link} className={active ? classes.active : null}>
        {children}
      </a>
    </li>
  );
};


