import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout';
import Builder from './containers/Builder';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Layout>
					<Builder />
				</Layout>
			</div>
		);
	}
}

export default App;
