import React, { Component, PropTypes } from 'react'

const style = {
	display: "inline-block",
	width: '10px',
	height: '5px',
	margin: '2px'
}

export default class HorizontalBar extends Component {
	static propTypes = {
		color: PropTypes.string
	}
	
	render() {
		let { backgroundColor } = this.props;
		
		backgroundColor = backgroundColor || '#000000';
		
		return (
			<div style={{...style, backgroundColor}} />
		)
	}
}