import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const burgerBuilder = () => {
	const [ ingredients, setIngredients ] = useState(null);
	const [ price, setPrice ] = useState(4);
	const [ purchasable, setPurchasable ] = useState(false);
	const [ purchasing, setPurchasing ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		axios.get('/ingredients.json').then((response) => setIngredients(response.data)).catch((error) => {
			setError(true);
		});
	}, []);

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
		const order = {
			ingredinets: ingredients,
			price: price,
			customer: {
				name: 'Foti',
				address: {
					street: 'testStreet 1',
					zipCode: '2356',
					country: 'Greece'
				},
				email: 'test@otest.com'
			},
			deliveryMethod: 'fastest'
		};
		setLoading(true);

		axios
			.post('/orders.json', order)
			.then(() => {
				setLoading(false);
				setPurchasing(false);
			})
			.catch((error) => console.log(error));
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

	let orderSummary = (
		<OrderSummary
			ingredients={ingredients}
			price={price}
			purchasable={purchasable}
			purchaseCanselled={purchaseCanselHandler}
			purchaseContinued={purchaseContinueHandler}
		/>
	);
	// This is for waiting untill we load the ings from the server
	if (loading || !ingredients) {
		orderSummary = <Spinner />;
	}
	// This is for waiting untill we load the ings from the server
	let burger = <Burger ingredients={ingredients} purchasable={purchasable} />;
	if (!ingredients && !error) {
		burger = <Spinner />;
	} else if (error) {
		burger = (
			<div  style={{ marginTop: '20vh', textAlign: 'center' }} >
				<h1>Ingredients can't be loaded.</h1>
				<p>Please check internet connection.</p>
			</div>
		);
	}
	return (
		<Aux>
			<Modal show={purchasing} modalClosed={purchaseCanselHandler}>
				{orderSummary}
			</Modal>
			{burger}
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

export default withErrorHandler(burgerBuilder, axios);
