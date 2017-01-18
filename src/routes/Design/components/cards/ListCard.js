import React, { Component, PropTypes } from 'react'
import Button from 'react-mdl/lib/Button'

export default class ListCard extends Component {
	render() {
		const { setting } = this.props;
		
		return (
			<Button raised primary>foo</Button>
		)
	}
}