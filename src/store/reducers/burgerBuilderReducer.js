import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	loading: false,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const addIngredient = (state, action) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const IngsAndPrice = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
	return updateObject(state, IngsAndPrice);
};

const removeIngredient = (state, action) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const IngsAndPrice = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
	return updateObject(state, IngsAndPrice);
};

const initBurger = (state, action) => {
	return updateObject(state, {
		ingredients: action.ingredients,
		error: false,
		loading: false
	});
};

const startBurger = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		totalPrice: 4,
		error: false,
		loading: false,
		building: false
	});
};

const burgerFaild = (state, action) => {
	return updateObject(state, {
		error: true,
		loading: false
	});
};

const loading = (state, action) => {
	return updateObject(state, {
		error: true
	});
};

export const burgerBuilderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.INIT_BURGER:
			return initBurger(state, action);
		case actionTypes.START_BURGER:
			return startBurger(state, action);
		case actionTypes.BURGER_FAILED:
			return burgerFaild(state, action);
		case actionTypes.LOADING:
			return loading(state, action);
		default:
			return state;
	}
};
