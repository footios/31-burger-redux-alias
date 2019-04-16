import React from 'react';
// import { withRouter } from 'react-router-dom'
import uuidv4 from 'uuid/v4';

import classes from './index.module.css';
import BurgerIngredient from './BurgerIngredient';

// child of BurgerBuilder
export default ({ ingredients, purchasable }) => {
	// 154 Code from Q&A
	const renderContent = (obj) => {
		if (!purchasable) return <p>Start adding ingredients</p>;
		return Object.entries(obj).map((entry) =>
			Array.from(Array(entry[1])).map(() => <BurgerIngredient key={uuidv4()} type={entry[0]} />)
		);
	};

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{renderContent(ingredients)}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};
