import React, { Component, PropTypes } from 'react'
import { Dimensions } from '../modules/constants'
import HorizontalBar from './HorizontalBar'

const style = {
	position: 'relative',
	float: 'right',
	clear: 'both',
	border: '1px solid grey',
	padding: '0px',
	marginLeft: '30px',
	marginBottom: Dimensions.TRIALMARGINBOTTOM + 'px',
	backgroundColor: 'white',
	cursor: 'move',
	width: Dimensions.TRIALWIDTH + 'px',
	height: Dimensions.TRIALHEIGHT + 'px'
}

const conditionStyle = {
	position: 'absolute',
	left: Dimensions.TRIALWIDTH + 5 + 'px',
	top: '0px',
	width: '10px',
	height: Dimensions.TRIALHEIGHT + 'px'
}

export default class Thumbnail extends Component {
	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
	}
	
	static propTypes = {
		id: PropTypes.number.isRequired,
		onThumbnailClick: PropTypes.func.isRequired
	}
	
	_onClick() {
		this.props.onThumbnailClick()
	}
	
	render() {
		const { id, branchStyle } = this.props;
		
		return (
			<div style={{
				height: '30px',
				padding: '5px'}}  onClick={this._onClick}>
				Trial{id}
			</div>
		)
	}
}