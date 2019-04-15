import React from "react";
import classes from "./index.module.css";
import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";

// child of Layout
export default () => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};


