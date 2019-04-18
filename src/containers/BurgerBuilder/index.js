import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/';

export default connect(mapStateToProps, mapDispatchToProps)(
	withErrorHandler((props) => {
		const [ purchasing, setPurchasing ] = useState(false);

		useEffect(() => {
			props.onInitIngredients();
		}, []);

		const updatePurchaseState = (ingredients) => {
			const sum = Object.keys(ingredients)
				.map((igKey) => {
					return ingredients[igKey];
				})
				.reduce((sum, el) => {
					return sum + el;
				}, 0);
			return sum > 0;
		};

		const purchaseHandler = () => {
			setPurchasing(true);
		};

		const purchaseCanselHandler = () => {
			setPurchasing(false);
		};

		const purchaseContinueHandler = () => {
			props.onInitPurchase();
			props.history.push('/checkout');
		};

		// This is for the less button. So values don't get a minus value.
		const disabledInfo = {
			...ingredients
		};
		// Here we assing to the value a boolean => true/false
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={props.ings} />
					<BuildControls
						ingredientAdded={props.onIngredientAdded}
						ingredientRemoved={props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={updatePurchaseState(props.ings)}
						ordered={purchaseHandler}
						price={props.price}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={props.ings}
					price={props.price}
					purchaseCancelled={purchaseCancelHandler}
					purchaseContinued={purchaseContinueHandler}
				/>
			);
		}
		// {salad: true, meat: false, ...}
		return (
			<Aux>
				<Modal show={state.purchasing} modalClosed={purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}),
	axios
);

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit())
	};
};
