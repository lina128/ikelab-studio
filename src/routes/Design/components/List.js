import React, { Component } from 'react'

export default class List extends Component {
	render() {
		const { customStyle } = this.props;
		return (
			<ul style={customStyle}>
				{this.props.children}
			</ul>
		)
	}
}