import React from 'react';
// import { withRouter } from 'react-router-dom'
import uuidv4 from 'uuid/v4';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// child of BurgerBuilder
const burger = ({ ingredients, purchasable }) => {

		// 154
		const renderContent = obj => {
			if (!purchasable) return <p>Start adding ingredients</p>;
			return Object.entries(obj).map(entry =>
				Array.from(Array(entry[1])).map(() => (
					<BurgerIngredient key={uuidv4()} type={entry[0]} />
				))
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

export default burger;
