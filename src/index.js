import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { burgerBuilderReducer } from './store/reducers/burgerBuilderReducer';
import { orderReducer } from './store/reducers/orderReducer'
import { fetchOrdersReducer } from './store/reducers/fetchOrdersReducer'
import { authReducer } from './store/reducers/authReducer'

import './index.module.css';
import App from './App';



let devtools = process.env.NODE_ENV === 'development' 
? composeWithDevTools(applyMiddleware(thunk))
: applyMiddleware(thunk)

// const composeEnhancers = process.env.NODE_ENV === 'development' ?
//  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	fetchOrders: fetchOrdersReducer,
	auth: authReducer
})

const store = createStore(rootReducer, devtools);

// Note curly braces didn't work!
// With parentheses you can execute multiple JSX code.
const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

ReactDOM.render(app, document.getElementById('root'));

