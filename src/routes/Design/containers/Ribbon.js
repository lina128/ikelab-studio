import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTrial } from '../modules/design'
import { addBlock } from '../modules/design'
import { addRun } from '../modules/design'
import { addCondition } from '../modules/design'
import AddButton from '../components/AddButton'
import Trash from './Trash'
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
		}
	}
}

export class Ribbon extends Component {
	render() {
		const { addTrial, addBlock, addRun, addCondition } = this.props;
		
		return (
			<div className={'design_ribbon_default'}>
				<div>
					<AddButton clickHandler={addTrial} text={"Add Trial"} />
					<AddButton clickHandler={addBlock} text={"Add Block"} />
					<AddButton clickHandler={addRun} text={"Add Run"}/>
					<AddButton clickHandler={addCondition} text={"Add Condition"} />
					<Trash />
				</div>
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(Ribbon)