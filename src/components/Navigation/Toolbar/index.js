import React from "react";
import classes from "./index.module.css";
import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";
import DrawerToggle from '../DrawerToggle'

// child of Layout
export default ({ drawerToggleClicked }) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};


