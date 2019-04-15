import React from 'react';
// import { withRouter } from 'react-router-dom'
import uuidv4 from 'uuid/v4';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// child of BurgerBuilder
const burger = ({ ingredients }) => {
	let transformedIngredients = Object.keys(ingredients)
	.map(igKey => {
		// transform the igKey, string value, into an array
		// with as many elements as the value of the igKey
		// We use an underscore in the second map func,
		// because we don't care about the element itself,
		// since we are going to pass it to the <BurgerIngredient />
		// through 'type'.
		// console.log('igKey', igKey)
		return [...Array(ingredients[igKey])].map((_, index) => {
			// console.log(ingredients[igKey])
			return <BurgerIngredient key={uuidv4()} type={igKey} />

		}
		);
	})

		.reduce((arr, el) => arr.concat(el), []);

	// console.log(transformedIngredients);

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
