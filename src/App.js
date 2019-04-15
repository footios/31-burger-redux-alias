import React from 'react';
import './App.module.css';
import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

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
