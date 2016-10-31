import React, { Component, PropTypes } from 'react'
import './AddButton.scss'
import SquareButton from './SquareButton'
import AddButtonImage from '../assets/plus-box.png'

export default class AddButton extends Component {
	render() {
		const { clickHandler, text } = this.props;

		return (
			<div className='designAddButton' onClick={clickHandler}>
				<SquareButton customStyle={{backgroundImage: 'url('+AddButtonImage+')'}} />
				{text}
			</div>
		)
	}
}