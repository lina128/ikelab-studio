import React, { Component, PropTypes } from 'react'
import Textfield from 'react-mdl/lib/Textfield'
import { inputStyle } from '../../constants'

export default class InputField extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	
	static propTypes = {
		trialId: PropTypes.number.isRequired,
		fieldConstantKey: PropTypes.string.isRequired,
		fieldConstant: PropTypes.object.isRequired,
	  fieldSetting: PropTypes.any.isRequired,
		onChange: PropTypes.func.isRequired
	}
	
	handleChange(event) {
		const { onChange, trialId, fieldConstantKey } = this.props;
		onChange(trialId, {[fieldConstantKey]: event.target.value})
	}
	
	render() {
		const { fieldConstant, fieldSetting } = this.props;
		
		return(
			<div>
				{fieldConstant.name}:
				<Textfield style={{width: inputStyle.sm}} value={fieldSetting} label="Text..." onChange={this.handleChange} />
				{fieldConstant.hints}
			</div>
		)
	}
}