import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { ActionCreators } from 'redux-undo'
import { addTrial } from '../modules/design'
import { addBlock } from '../modules/design'
import { addRun } from '../modules/design'
import { addCondition } from '../modules/design'
import AddButton from '../components/AddButton'
import Trash from './Trash'
import Button from 'react-mdl/lib/Button'
import './Ribbon.scss'

const getPastSteps = (state) => state.design.past.length
const getFutureSteps = (state) => state.design.future.length

const getPastMemoized = createSelector(
	[ getPastSteps ],
	(pastSteps) => pastSteps > 0 ? true : false
)

const getFutureMemoized = createSelector(
	[ getFutureSteps ],
	(futureSteps) => futureSteps > 0 ? true : false
)

const mapStateToProps = (state) => {
	return {
		pastSteps: getPastMemoized(state),
		futureSteps: getFutureMemoized(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTrial: () => {
			dispatch(addTrial())
		},
		addBlock: () => {
			dispatch(addBlock())
		},
		addRun: () => {
			dispatch(addRun())
		},
		addCondition: () => {
			dispatch(addCondition())
		},
		undo: () => {
			dispatch(ActionCreators.undo())
		},
		redo: () => {
			dispatch(ActionCreators.redo())
		}
	}
}

export class Ribbon extends Component {
	render() {
		const { addTrial, addBlock, addRun, addCondition, undo, redo, pastSteps, futureSteps } = this.props;
		
		return (
			<div className={'design_ribbon_default'}>
				<div>
					<AddButton clickHandler={addTrial} text={"Add Trial"} />
					<AddButton clickHandler={addBlock} text={"Add Block"} />
					<AddButton clickHandler={addRun} text={"Add Run"}/>
					<AddButton clickHandler={addCondition} text={"Add Condition"} />
					<Trash />
					{pastSteps ? <Button raised accent ripple onClick={undo}>Undo</Button> : <Button raised>Undo</Button>}
					{futureSteps ? <Button raised accent ripple onClick={redo}>Redo</Button> : <Button raised>Redo</Button>}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Ribbon)