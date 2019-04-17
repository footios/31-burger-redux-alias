import React from "react";
import { NavLink } from 'react-router-dom'

import classes from "./index.module.css";

export default ({link, exact, children}) => {

  // Here we use and ancor tag '<a>'.
  // But with Router we use a 'Link'.

  // In order to have the 'Burger Builder' link shown as active,
  // we need to use 'activeClassName' because otherwise,
  // css modules will convert the className into a unique className.

  // In order to have only Burger Builder shown as active in first load, we need to use 'exact'.
  // If we use it like it is here, 
  //  <NavLink to={props.link} exact activeClassName={classes.active}>
  // it will do the job, 
  // but it will attach it to all NavLinks.
  // To fix this, we pass 'exact' in 'NavigationItems.js'... as a property,
  // and then here we can use that prop...
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} exact={exact} activeClassName={classes.active}>
        {children}
      </NavLink>
    </li>
  );
};


