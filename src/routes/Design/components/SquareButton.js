import React, { Component, PropTypes } from 'react'

const style = {
	width: '48px',
	height: '48px',
	backgroundRepeat: 'no-repeat'
}
export default class SquareButton extends Component {
	render() {
		const { customStyle } = this.props;
		
		return (
			<div style={{...style, ...customStyle}} />
		)
	}
}