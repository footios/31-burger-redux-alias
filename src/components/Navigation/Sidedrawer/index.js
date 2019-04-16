import React from "react";

import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";
import classes from "./index.module.css";
import Backdrop from "../../UI/Backdrop";
import Aux from "../../../hoc/Aux";

// child of layout
export default ({ open, closed }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  //  className={[classes.SideDrawer, open ?
  // classes.Open : classes.Close].join(' ')}
  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};


