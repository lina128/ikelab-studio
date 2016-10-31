import React, { Component, PropTypes } from 'react'

const style = {
	listStyle: 'none',
	padding: '0',
	margin: '0'
}

export default class List extends Component {
	render() {
		const { customStyle } = this.props;
		return (
			<ul style={{...style, customStyle}}>
				{this.props.children}
			</ul>
		)
	}
}