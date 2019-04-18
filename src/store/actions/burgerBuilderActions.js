import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const  addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const  removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const startBurger = ings => {
    return {
        type: actionTypes.START_BURGER,
        ingredients: ings
    }
}

export const burgerFailed = error => {
    return {
        type: actionTypes.BURGER_FAILED,
        error: error
    }
}

export const loading = () => {
    return {
        type: actionTypes.LOADING,
    }
}

export const initBurger = () => {
    return dispatch => {
        loading();
        axios
        .get("/ingredients.json")
        .then(response => dispatch(startBurger(response.data)))
        .catch(error => dispatch(burgerFailed(error)));
    }
}