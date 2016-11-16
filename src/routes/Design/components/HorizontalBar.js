import React, { Component, PropTypes } from 'react'
import './HorizontalBar.scss'

export default class HorizontalBar extends Component {
	static propTypes = {
		backgroundColor: PropTypes.string
	}
	
	render() {
		let { backgroundColor } = this.props;
		
		return (
			<div className={'design_horizontalBar_default'} style={{backgroundColor: backgroundColor}} />
		)
	}
}