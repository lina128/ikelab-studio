import React, { Component, PropTypes } from 'react'

const style = {
	paddingLeft: '1em',
	textIndex: '-.7em'
}

export default class ListItem extends Component {
	static propTypes = {
		id: PropTypes.number.isRequired
	}
	render() {
		const { id } = this.props
		return (
			<li id={id} style={style}>
				{this.props.children}
			</li>
		)
	}
}