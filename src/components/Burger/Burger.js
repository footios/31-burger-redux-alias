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

		// 154
		// const renderContent = obj => {
		// 	// if (!purchasable) return <p>Start adding ingredients</p>;
		// 	return Object.entries(obj).map(entry =>
		// 		Array.from(Array(entry[1])).map(() => (
		// 			<BurgerIngredient key={uuidv4()} type={entry[0]} />
		// 		))
		// 	);
		// };
	// console.log(transformedIngredients);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p> Please start adding ingredients! </p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			{/* {renderContent(ingredients)} */}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
