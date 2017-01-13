import React, { Component } from 'react'
import DefaultDisplay from './paradigms/DefaultDisplay'
import Text from './paradigms/Text'
import './TrialWrapper.scss'

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
	render() {
		const { trial } = this.props

		if(trial) {
			const MyComponent = Components[trial.type] || Components[DEFAULT]

			return (
				<div className="design_trialWrapper_default">
					<MyComponent style={{width: '100%', height: '100%'}} trial={trial} />
				</div>
			)
		} else {
			return (
				<div className="design_trialWrapper_default"/>
			)
		}
	}
}