import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import flow from 'lodash/flow'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { findIndexById } from '../utils/findIndex'
import TrialWrapper from '../components/TrialWrapper'
import './TrialArea.scss'

const getEntities = (state) => state.design.entities
const getCurrentTrial = (state) => state.design.currentTrial

const getTrialMemoized = createSelector(
	[ getEntities, getCurrentTrial ],
	(entities, currentTrial) => {
		if(!currentTrial) {
			return null
		} else {
			return entities[findIndexById(entities, currentTrial)]
		}
	}
)

const mapStateToProps = (state) => {
	return {
		currentTrialObject: getTrialMemoized(state)
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

export class TrialArea extends Component {
	static propTypes = {
		currentTrial: PropTypes.object
	}
	
	render() {
		const { currentTrialObject } = this.props;

		return (
			<div className={'design_trialArea_default'}>
				<TrialWrapper trial={currentTrialObject} />
			</div>
		)
	}
}

export default flow(
	DropTarget('', {}, collect),
	connect(mapStateToProps)
)(TrialArea)