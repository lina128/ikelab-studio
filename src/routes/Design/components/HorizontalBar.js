import React, { Component, PropTypes } from 'react'
import './HorizontalBar.scss'

export default class HorizontalBar extends Component {
	static propTypes = {
		color: PropTypes.string
	}
	
	render() {
		let { backgroundColor } = this.props;
		
		backgroundColor = backgroundColor || '#000000';
		
		return (
			<div className={'design_horizontalBar_default'} style={{backgroundColor: backgroundColor}} />
		)
	}
}