import React, { Component, PropTypes } from 'react'
import './DefaultCard.scss'

export default class DefaultCard extends Component {
	static propTypes = {
		setting: PropTypes.object.isRequired
	}
	
	render() {
		const { setting } = this.props;
		
		return (
			<div className='design_defaultCard_default'>
				<div className='design_defaultCard_title'>
					{setting.name}
				</div>
			</div>
		)
	}
}