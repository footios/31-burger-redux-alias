import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from '../ContactData';

export default (props) => {

    /* If we start with `null` as initial state for ingredients,
    burger gets null when this component renders. => error
    So we use an []...*/
	const [ ingredients, setIngredients ] = useState([]); 
	const [ totalPrice, setTotalPrice ] = useState(0);
    
    // old comment:
	// After passing the ingredients to the search query in BurgerBuilder
	// now we need to parse them in the Checkout
	// 251. We need to change the life cycle hook to ...WillMount because we
	// get an error. We need to parse the ingredients before it mounts,
	// because otherwise the component will try to render with null ingredients...
	useEffect(() => {
		console.log('Checkout : ', props);

		const query = new URLSearchParams(props.location.search);
		const ReceivedIngredients = {};
		let price = 0;
		for (let param of query.entries()) {
			// ['salad', '1']
			// This is a workaround to get the price, i.e. temporary...
			if (param[0] === 'price') {
				price = param[1];
			} else {
				ReceivedIngredients[param[0]] = +param[1];
			}
		}
		// Because we save the ingredients to state. They will not change if we change the address
		// (if the query params get lost)
		// by going to 'chekout/contact-data'
		console.log('Checkout : ', ReceivedIngredients, ' ', price);
		setTotalPrice(price);
		setIngredients(ReceivedIngredients);
	}, []);

	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};

	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	};

	return (
		<div>
			<CheckoutSummary
				ingredients={ingredients}
				checkoutCancelled={checkoutCancelledHandler}
				checkoutContinued={checkoutContinuedHandler}
			/>
			<Route
				path={props.match.path + '/contact-data'}
				render={(props) => <ContactData ingredients={ingredients} price={totalPrice} {...props} />}
			/>
		</div>
	);
};
