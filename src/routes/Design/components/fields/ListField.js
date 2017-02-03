import React, { Component, PropTypes } from 'react'
import Menu from 'react-mdl-portal-menu/lib/Menu'
import MenuItem from 'react-mdl-portal-menu/lib/MenuItem'
import Button from 'react-mdl/lib/Button'
import { btnStyle } from '../../constants'

export default class ListField extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.renderOption = this.renderOption.bind(this);
	}
	
	
	static propTypes = {
		trialId: PropTypes.number.isRequired,
		fieldConstantKey: PropTypes.string.isRequired,
		fieldConstant: PropTypes.object.isRequired,
	  fieldSetting: PropTypes.any.isRequired,
		onChange: PropTypes.func.isRequired
	}
	
	handleClick(option) {
		const { onChange, trialId, fieldConstantKey } = this.props;
		onChange(trialId, {[fieldConstantKey]: option})
	}
	
	renderOption(option, ind, arr) {
		return (
			<MenuItem key={ind} onClick={() => this.handleClick(option)}>{option}</MenuItem>
		)
	}
	
	render() {
		const { fieldConstant, fieldSetting } = this.props;
		
		const menuItems = [];
		
		for(let i=0; i<fieldConstant.options.length; i++) {
			menuItems.push()
		}
		
		const btn = (<Button style={{width: btnStyle.sm}} raised colored ripple>
										{fieldSetting}
								 </Button>)
					
		return (
			<div>
				{fieldConstant.name}:
				<Menu target={btn} valign={'bottom'} align={'left'}>
					{fieldConstant.options.map(this.renderOption)}
				</Menu>
			</div>
		)
	}
}