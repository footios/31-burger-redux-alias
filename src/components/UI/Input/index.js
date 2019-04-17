import React from 'react';

import classes from './index.module.css';

export default (props) => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (props.inValid && props.touched) {
		inputClasses.push(classes.Invalid)
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			); // selfclosing element in React
			break;
		case 'select':
			inputElement = ( // or maybe just: classes.InputElement
				<select className={classes.InputElement} value={props.value} onChange={props.changed}>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} defaultValue={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')} 
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};


