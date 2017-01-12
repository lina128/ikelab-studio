import React, { Component, PropTypes } from 'react'
import './AddButton.scss'
import AddButtonImage from '../assets/plus-box.png'

export default class AddButton extends Component {
	static propTypes = {
		clickHandler: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired
	}
	
	render() {
		const { clickHandler, text } = this.props;

		return (
			<div className={'design_addButton_btn'} onClick={clickHandler}>
				<img 
					alt='Add' 
					style={{display: 'block'}} 
					src={AddButtonImage} />
				<span>{text}</span>
			</div>
		)
	}
}