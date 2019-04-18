import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	orders: [],
	loading: true
};

const fetchOrders = (state, action) =>
	updateObject(state, {
		orders: [ ...action.orders ], // concat is not working as expected!!!
		loading: false
	});

const fetchOrdersStart = (state, action) => updateObject(state, { loading: true });

const fetchOrdersFail = (state, action) => updateObject(state, { loading: false });

const deleteOrderOnServer = (state, action) => updateObject(state, {});

export const fetchOrdersReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ORDERS:
			return fetchOrders(state, action);
		case actionTypes.FETCH_ORDERS_START:
			return fetchOrdersStart(state, action);
		case actionTypes.FETCH_ORDERS_FAIL:
			return fetchOrdersFail(state, action);
		case actionTypes.DELETE_ORDER:
			const orders = state.orders.filter((order) => order.id !== action.orderId);
			return {
				...state,
				loading: false,
				orders: orders
			};
		case actionTypes.DELETE_ORDER_ON_SERVER:
			return deleteOrderOnServer(state, action);
		default:
			return state;
	}
};
