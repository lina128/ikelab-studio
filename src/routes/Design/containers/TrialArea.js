import React, { Component, PropTypes } from 'react'
import flow from 'lodash/flow'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import './TrialArea.scss'

const mapStateToProps = (state) => {
	return {
		currentTrial: state.design.currentTrial
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

export class TrialArea extends Component {
	static propTypes = {
		currentTrial: PropTypes.number
	}
	
	render() {
		const { currentTrial } = this.props;

		if(currentTrial) {
			return (
				<div className={'design_trialArea_default'}>
				 Trial {currentTrial}
				</div>
			)
		} else {
			return (
				<div className={'design_trialArea_default'} />
			)
		}
	}
}

export default flow(
	DropTarget('', {}, collect),
	connect(mapStateToProps)
)(TrialArea)