import React from 'react';
import { withRouter } from 'react-router-dom'
import uuidv4 from 'uuid/v4';

import classes from './index.module.css';
import BurgerIngredient from './BurgerIngredient';

// child of BurgerBuilder
const burger = props => {
	let transformedIngredients = Object.keys(props.ingredients)
	  .map(igKey => {
		// transform the igKey, string value, into an array
		// with as many elements as the value of the igKey
		// We use an underscore in the second map func,
		// because we don't care about the element itself,
		// since we are going to pass it to the <BurgerIngredient />
		// through 'type'.
		return [...Array(props.ingredients[igKey])].map((_, index) => (
		  <BurgerIngredient key={uuidv4()} type={igKey} />
		));
	  })
	  .reduce((acc, elem) => {
		return acc.concat(elem);
	  }, []);
  
	if (transformedIngredients.length === 0) {
	  transformedIngredients = <p> Please start adding ingredients! </p>;
	}
  
	return (
	  <div className={classes.Burger}>
		<BurgerIngredient type="bread-top" />
		{transformedIngredients}
		<BurgerIngredient type="bread-bottom" />
	  </div>
	);
  };
  
  export default withRouter(burger);
