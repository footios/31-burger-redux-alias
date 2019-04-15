import React from "react";

import BuildControl from "./BuildControl/BuildControl";

import classes from './BuildControls.module.css'

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {

  // let button = 'START ADDING INGREDIENTS'
  // if (props.isAuth) {
  //   button = 'ORDER NOW'
  // } else if (props.building && !props.isAuth) {
  //   button = 'BURGER READY? SIGN UP AND ORDER'
  // }
  return (
    <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} // we access e.g. {salad: true, meat: false}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      // onClick={props.ordered}
    >
    {/* {button} */}
    ORDER
      
    </button>
  </div>
  )
}
  


export default buildControls;
