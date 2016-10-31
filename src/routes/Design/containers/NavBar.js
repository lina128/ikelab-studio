import React, { Component, PropTypes } from 'react'
import ConditionPane from './ConditionPane'
import DesignPane from './DesignPane'

const style = {
	width: '100%',
	height: '1000px',
	maxWidth: '240px',
	minWidth: '240px',
	float: 'left'
}

export default class NavBar extends Component {
	render() {
		return (
			<div style={style}>
				<ConditionPane />
				<DesignPane />
			</div>
		)
	}
}