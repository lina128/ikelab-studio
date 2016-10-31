import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

const style = {
	float: 'left',
	width: '60%',
	minWidth: '700px',
	maxWidth: '700px',
	height: '1000px',
	border: '1px solid grey'
}

const mapStateToProps = (state) => {
	return {
		currentTrial: state.design.currentTrial
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

@DropTarget('', {}, collect)
@connect(mapStateToProps)
export default class TrialArea extends Component {
	static propTypes = {
		currentTrial: PropTypes.number
	}
	
	render() {
		const { currentTrial } = this.props;

		if(currentTrial) {
			return (
				<div style={style}>
				 Trial {currentTrial}
				</div>
			)
		} else {
			return (
				<div style={style} />
			)
		}
	}
}