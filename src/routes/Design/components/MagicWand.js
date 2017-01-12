import React, { Component, PropTypes } from 'react'
import MagicWandImage from '../assets/auto-fix.png'
import './MagicWand.scss'

export default class MagicWand extends Component {
	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
	}
	
	static propTypes = {
		id: PropTypes.string.isRequired,
		content: PropTypes.object.isRequired,
		onWandClick: PropTypes.func.isRequired
	}
	
	_onClick() {
		this.props.onWandClick(this.props.id, this.props.content)
	}
	
	render() {
		return (
			<div className='design_magicWand_default' onClick={this._onClick}></div>
		)
	}
}