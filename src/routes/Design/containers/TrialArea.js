import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'
import { createSelector } from 'reselect'
import flow from 'lodash/flow'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { findIndexById } from '../utils/findIndex'
import { changeSetting } from '../modules/design'
import { updateStructureChange } from '../modules/design'
import TrialWrapper from '../components/TrialWrapper'
import SettingPane from '../components/SettingPane'
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

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange: (id, change) => {
			dispatch(changeSetting(id, change))
		},
		didChangeStructure: (id, screenshot) => {
			dispatch(updateStructureChange(id, {screenshot: screenshot}))
		}
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

export class TrialArea extends Component {
	static propTypes = {
		currentTrialObject: PropTypes.object
	}
	
	componentDidUpdate(prevProps) {
		let mapNode = ReactDOM.findDOMNode(this.refs.trialWrapper)
		let that = this
		html2canvas(mapNode).then(function(canvas) {
			that.props.didChangeStructure(that.props.currentTrialObject.id, canvas.toDataURL())
		})
	}
	
	render() {
		const { currentTrialObject, handleChange } = this.props;

		return (
			<div className={'design_trialArea_default'}>
				<TrialWrapper ref="trialWrapper" trial={currentTrialObject} onChange={handleChange} />
				<SettingPane trial={currentTrialObject} onChange={handleChange} />
			</div>
		)
	}
}

export default flow(
	DropTarget('', {}, collect),
	connect(mapStateToProps, mapDispatchToProps)
)(TrialArea)