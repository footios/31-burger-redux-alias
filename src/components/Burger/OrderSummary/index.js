import React from "react";
import uuidv4 from "uuid/v4";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button";

// child of BurgerBuiler
export default ({ingredients, price, purchaseCanselled, purchaseContinued}) => {
  const ingredientSummary = Object.keys(ingredients).map((igkey, i) => {
    return (
      <li key={uuidv4()} style={{ textTransform: "capitalize", listStyleType: 'none' }}>
        <span >{igkey}</span>:{" "}
        {ingredients[igkey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Burger ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {price}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={purchaseCanselled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};


