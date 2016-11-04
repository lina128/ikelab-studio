import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTrial } from '../modules/design'
import { addBlock } from '../modules/design'
import { addRun } from '../modules/design'
import { addCondition } from '../modules/design'
import AddButton from '../components/AddButton'
import Trash from './Trash'

const style = {
	width: '100%',
	height: '100px',
	border: '1px solid grey'
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
		}
	}
}

@connect(null, mapDispatchToProps)
export default class Ribbon extends Component {
	render() {
		const { addTrial, addBlock, addRun, addCondition } = this.props;
		
		return (
			<div style={style}>
				<div>
					<AddButton clickHandler={addTrial} text={"Add Trial"}/>
					<AddButton clickHandler={addBlock} text={"Add Block"}/>
					<AddButton clickHandler={addRun} text={"Add Run"}/>
					<AddButton clickHandler={addCondition} text={"Add Condition"}/>
					<Trash />
				</div>
			</div>
		)
	}
}