import React, { useState } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

export default () => {
	const InitialIngredients = {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	};
	const [ ingredients, setIngredients ] = useState(InitialIngredients);
	const [ price, setPrice ] = useState(4);
	const [ purchasable, setPurchasable ] = useState(false);
	const [ purchasing, setPurchasing ] = useState(false);

	const updatePurchaseState = (ingredients) => {
		const sum = Object.values(ingredients).reduce((acc, elem) => {
			return acc + elem;
		}, 0);

		setPurchasable(sum > 0); // This is either true/false
	};

	const purchaseHandler = () => {
		setPurchasing(true);
	};

	const purchaseCanselHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		alert('You continue!');
	};

	const addIngredientHandler = (type) => {
		const updatedIngredients = {
			...ingredients,
			...(ingredients[type] = ingredients[type] + 1)
		};
		setIngredients(updatedIngredients);
		setPrice(price + INGREDIENT_PRICES[type]);
		updatePurchaseState(updatedIngredients);
	};

	const removeIngredientHandler = (type) => {
		const updatedIngredients = {
			...ingredients,
			...(ingredients[type] = ingredients[type] - 1)
		};
		setIngredients(updatedIngredients);
		setPrice(price - INGREDIENT_PRICES[type]);
		updatePurchaseState(updatedIngredients);
	};

	// This is for the less button. So values don't get a minus value.
	const disabledInfo = {
		...ingredients
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}
	return (
		<Aux>
			<Modal show={purchasing} modalClosed={purchaseCanselHandler}>
				<OrderSummary
					ingredients={ingredients}
					price={price}
					purchasable={purchasable}
					purchaseCanselled={purchaseCanselHandler}
					purchaseContinued={purchaseContinueHandler}
				/>
			</Modal>
			<Burger ingredients={ingredients} purchasable={purchasable} />
			<BuildControls
				ingredientAdded={addIngredientHandler}
				ingredientRemoved={removeIngredientHandler}
				disabled={disabledInfo}
				price={price}
				purchasable={purchasable}
				purchasing={purchaseHandler}
			/>
		</Aux>
	);
};
