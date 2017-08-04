import React, { Component } from 'react';
import DropContainer from '../../components/drop/DropContainer.jsx';

import './Drop.css';

export default class Drop extends Component {
	render() {
		return (
			<div className='Drop'>
				<DropContainer />
			</div>
		)
	}
}
