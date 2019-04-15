import React from "react";

import BuildControl from "./BuildControl/BuildControl";

import classes from './BuildControls.module.css'

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = ({price, disabled, ingredientAdded, ingredientRemoved, purchasable }) => {

  // let button = 'START ADDING INGREDIENTS'
  // if (props.isAuth) {
  //   button = 'ORDER NOW'
  // } else if (props.building && !props.isAuth) {
  //   button = 'BURGER READY? SIGN UP AND ORDER'
  // }
  return (
    <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => ingredientAdded(ctrl.type)}
        removed={() => ingredientRemoved(ctrl.type)}
        disabled={disabled[ctrl.type]} // we access e.g. {salad: true, meat: false}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!purchasable}
      // onClick={props.ordered}
    >
    {/* {button} */}
    ORDER
      
    </button>
  </div>
  )
}
  


export default buildControls;
