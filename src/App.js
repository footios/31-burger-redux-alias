import React from 'react';
import './App.css';
import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const app = props => {
		return (
			<div className="App">
				<Layout>
					<BurgerBuilder />
				</Layout>
			</div>
		);
	}


export default app;
