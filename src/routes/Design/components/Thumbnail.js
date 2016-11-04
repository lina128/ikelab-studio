import React, { Component, PropTypes } from 'react'
import HorizontalBar from './HorizontalBar'
import './Thumbnail.scss'

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
			<div className={'design_thumbnail_default'} onClick={this._onClick}>
				Trial{id}
			</div>
		)
	}
}