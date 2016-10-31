import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const style = {
	position: 'fixed',
	top: '0px',
	left: '500px',
	backgroundColor: '#ffffb2',
	opacity: '0.8'
}
const mapStateToProps = (state) => {
	return {
		message: state.design.message
	}
}

@connect(mapStateToProps)
export default class Note extends Component {
	render() {
		const { message } = this.props;
		const visibility = message ? 'visible' : 'hidden';
		
		return (
			<div style={{...style, visibility: visibility}}>
				{message}
			</div>
		)
	}
}