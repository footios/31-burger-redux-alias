import React from 'react';
// import { withRouter } from 'react-router-dom'

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// child of BurgerBuilder
const burger = ({ ingredients }) => {
	let transformedIngredients = Object.keys(ingredients).map((igKey, index) => (
		<BurgerIngredient key={igKey + index} type={igKey} />
	));

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

export default burger;
