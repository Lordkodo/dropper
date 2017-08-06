import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading.jsx';

import './Drop.css';

export default class Drop extends Component {
	static propTypes = {
		processing: PropTypes.bool,
		onDrop: PropTypes.func,
		error:  PropTypes.string,
		link: PropTypes.string,
	};

	onDragOver = (event) => {
		event.preventDefault();
	}

	onDrop = (event) => {
		event.preventDefault();
		this.props.onDrop(event.dataTransfer.files[0]);
	}
	renderImage = () => {
		if(this.props.processing) {
			return (
				<div className='Drop-content loading'>
					<Loading />
				</div>
			);
		}
		return (
			<div className='Drop-content'>
				<span className='Drop-content-icon' />
				<p className='Drop-content-subtitle'>Drag & Drop a File (xml or csv)</p>
			</div>
		);
	}

	renderMessage = () => {
		if (this.props.error.length > 0) {
			return <p className='Drop-text-result'>{this.props.error}</p>;
		} else if (this.props.link.length > 0) {
			return <p className='Drop-text-result'>You can access to your processed model <a href={this.props.link}>here</a></p>;
		}
		return null;
	}

	render() {
		return (
			<div
				className='Drop'
				onDragOver={this.onDragOver}
				onDragEnter={this.onDragEnter}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			>
				<h1 className='Drop-title'>Dropper</h1>

				{this.renderImage()}

				<div className='Drop-text'>
					<p className='Drop-text-info'>Maximum updload file size: 25MB</p>
					{this.renderMessage()}
				</div>
			</div>
		)
	}
}
