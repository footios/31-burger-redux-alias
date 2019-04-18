import React, { useState } from 'react';

import axios from '../../axios-orders';

import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import Input from '../../components/UI/Input';

import classes from './index.module.css';

//child of Checkout
export default (props) => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'name'
			},
			value: '',
			validation: {
				required: true
			},
			touched: false,
			valid: false,
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'street'
			},
			value: '',
			validation: {
				required: true
			},
			touched: false,
			valid: false,
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'zip code'
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5
			},
			touched: false,
			valid: false,
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'country'
			},
			value: '',
			validation: {
				required: true
			},
			touched: false,
			valid: false,
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'e-mail'
			},
			value: '',
			validation: {
				required: true
			},
			touched: false,
			valid: false,
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{value: 'fastest', displayValue: 'fastest'},
					{value: 'cheapest', displayValue: 'cheapest'}
				]
			},
			value: 'fastest', // we fix this later
			valid: true, // needed for formIsValid...
			validation: {} // no need validation
		}})
	const [formIsValid, setFormIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const orderHandler = (event) => {
		event.preventDefault();
		console.log('in orderHandler: ', props);
		const formData = {};
		for (const orderFormIdentifier in orderForm) {
			if (orderForm.hasOwnProperty(orderFormIdentifier)) {
				 formData[orderFormIdentifier] = orderForm[orderFormIdentifier].value;
			}
		}
		setLoading(true)
		const order = {
			ingredients: props.ingredients,
			price: props.price,
			orderData: formData
		};

		axios
			.post('/orders.json', order)
			.then((response) => setLoading(false))
			.then((error) => setLoading(false));

		props.history.push('/');
	};

	const checkValidity = (value, rules) => {
		let isValid = true;
		
		// alternative option for validation select...
		// not needed!
		// if(!rules) {
		// 	return true;
		// }

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		return isValid;
	}
	
	const inputchangeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...orderForm
		}
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier] 
		}
		updatedFormElement.value = event.target.value 
		const rules = updatedFormElement.validation
		updatedFormElement.valid = checkValidity(updatedFormElement.value, rules);
		updatedOrderForm[inputIdentifier] = updatedFormElement
		updatedFormElement.touched = true;
		
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
				 formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
			}
		}
		console.log(formIsValid);
		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid)
	}

		const formElementsArray = [];
		for (const key in orderForm) {
			if (orderForm.hasOwnProperty(key)) {
				formElementsArray.push({
					id: key,
					config: orderForm[key]
				});
			}
		}
		let form = (
			<form onSubmit={orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
                        key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						inValid={!formElement.config.valid}
						touched={formElement.config.touched}
						changed={(event) => inputchangeHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success" disabled={!formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}



