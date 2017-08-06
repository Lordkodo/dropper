import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Drop from './drop/Drop.jsx';

import './App.css';

export default class App extends Component {
	componentDidMount() {
		if (window.location.protocol === 'https:') {
			window.location = 'http://' + window.location.host;
		}
	}

	render() {

		return (
			<div className='App'>
				<main>
					<Route exact path="/" component={Drop} />
				</main>
			</div>
		)
	}
}
