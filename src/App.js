import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.module.css';
import Layout from './containers/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders'

const app = (props) => {
	return (
		<div className="App">
			<Layout>
				<Switch>
					{/* With just 'exact' the order doesn't matter, but with Switch it does! */}
					{/* The 'exact' in the Route with path='/checkout' 
					was preventing the ContactData to render */}
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" exact component={Orders} />
					<Route path="/" exact component={BurgerBuilder} />
				</Switch>
			</Layout>
		</div>
	);
};

export default app;
