import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTrial } from '../modules/design'
import { addBlock } from '../modules/design'
import { addRun } from '../modules/design'
import { addCondition } from '../modules/design'
import { ActionCreators } from 'redux-undo'
import AddButton from '../components/AddButton'
import Trash from './Trash'
import Button from 'react-mdl/lib/Button'
import './Ribbon.scss'

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
		const { addTrial, addBlock, addRun, addCondition, undo, redo } = this.props;
		
		return (
			<div className={'design_ribbon_default'}>
				<div>
					<AddButton clickHandler={addTrial} text={"Add Trial"} />
					<AddButton clickHandler={addBlock} text={"Add Block"} />
					<AddButton clickHandler={addRun} text={"Add Run"}/>
					<AddButton clickHandler={addCondition} text={"Add Condition"} />
					<Trash />
					<Button raised accent ripple onClick={undo}>Undo</Button>
					<Button raised accent ripple onClick={redo}>Redo</Button>
				</div>
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(Ribbon)