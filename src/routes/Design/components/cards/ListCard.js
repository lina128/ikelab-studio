import React, { Component, PropTypes } from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'

export default class ListCard extends Component {
	render() {
		const { setting } = this.props;
		
		return (
			<Card>
				<CardTitle title={setting.name} />
				<CardText>test</CardText>
			</Card>
		)
	}
}