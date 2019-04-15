import React from "react";
import classes from "./index.module.css";
import NavigationItem from "./NavigationItem";

export default () => {
  return (
    // Because the 'active' attribute is a boolean value
    // we don't need to set active={true}
    // we can assign it like that: active
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  );
};


