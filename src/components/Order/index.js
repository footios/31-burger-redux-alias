import React from 'react';
import classes from './index.module.css';

export default ({ ingredients, price }) => {
	const orderIngredients = [];
	for (let ingredientName in ingredients) {
		orderIngredients.push({
			name: ingredientName,
			amount: ingredients[ingredientName]
		});
	}

	const indredientOutput = orderIngredients.map((ig) => {
		return (
			<span
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc',
					padding: '5px'
				}}
				key={ig.name}
			>
				{ig.name} ({ig.amount})
			</span>
		);
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {indredientOutput} </p>
			{/* Use Number.parseFloat() to convert the string to a number...
        or use a '+' where you load the <Order /> in the Orders.js */}

			<p>
				Price <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>{' '}
			</p>
		</div>
	);
};


