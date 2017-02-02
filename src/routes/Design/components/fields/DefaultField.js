import React, { Component, PropTypes } from 'react'

export default class DefaultCard extends Component {
	static propTypes = {
		fieldConstant: PropTypes.object.isRequired,
		fieldSetting: PropTypes.any.isRequired,
		onChange: PropTypes.func.isRequired
	}
	
	render() {
		const { fieldConstant, fieldSetting } = this.props;
		
		return (
			<div>
				{fieldConstant.name}:
				{fieldSetting}
			</div>
		)
	}
}