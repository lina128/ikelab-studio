import React, { Component, PropTypes } from 'react'
import './TrialWrapper.scss'
import DefaultDisplay from './frames/DefaultDisplay'
import Text from './frames/Text'

// ------------------------------------
// Constants
// ------------------------------------
export const DEFAULT = 'DEFAULT'
export const TEXT = 'TEXT'

// ------------------------------------
// Component Handlers
// ------------------------------------
export const Components = {
	[DEFAULT]: DefaultDisplay,
	[TEXT]: Text
}

export default class TrialWrapper extends Component {
	static propTypes = {
		trial: PropTypes.object,
		onChange: PropTypes.func.isRequired
	}
	
	render() {
		const { trial, onChange } = this.props

		if(trial) {
			const MyComponent = Components[trial.type] || Components[DEFAULT]

			return (
				<div id="design_trialWrapper" className="design_trialWrapper_default">
					<MyComponent style={{width: '100%', height: '100%'}} trial={trial} onChange={onChange} />
				</div>
			)
		} else {
			return (
				<div className="design_trialWrapper_default" />
			)
		}
	}
}