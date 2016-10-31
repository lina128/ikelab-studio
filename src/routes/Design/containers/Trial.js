import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { ItemTypes, Dimensions } from '../modules/constants'
import { DragSource, DropTarget } from 'react-dnd'
import HorizontalBar from '../components/HorizontalBar'
import Thumbnail from '../components/Thumbnail'

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

const branch = {
	trialBranchStyleSingle: {
		position: 'absolute',
		top: '23px',
		left: '-82px',
		width: '80px',
		height: '2px',
		borderTop: '1px solid grey',
		borderLeft: '1px solid grey',
		borderBottom: '1px solid grey'
	},
	trialBranchStyleTop: {
		position: 'absolute',
		top: '23px',
		left: '-82px',
		width: '80px',
		height: '57px',
		borderTop: '1px solid grey',
		borderLeft: '1px solid grey'
	},
	trialBranchStyleMiddle: {
		position: 'absolute',
		top: '23px',
		left: '-82px',
		width: '80px',
		height: '57px',
		borderLeft: '1px solid grey'
	},
	trialBranchStyleBottom: {
		position: 'absolute',
		top: '23px',
		left: '-82px',
		width: '80px',
		height: '1px',
		borderTop: '1px solid grey'
	}
}

const conditionStyle = {
	position: 'absolute',
	left: Dimensions.TRIALWIDTH + 5 + 'px',
	top: '0px',
	width: '10px',
	height: Dimensions.TRIALHEIGHT + 'px',
	wordSpacing: '0px',
	fontSize: '0px',
	letterSpacing: '0px'
}

const trialSource = {
	beginDrag(props) {
		return { id: props.id, level: 'trial' };
	},
	
	endDrag(props, monitor) {
		if(!monitor.didDrop()) {
			props.moveOutside(props.id);
		}
	}
};

const trialTarget = {
	hover(props, monitor, component) {
		const draggedId = monitor.getItem().id;
		const droppedComponentPosition = ReactDOM.findDOMNode(component).getBoundingClientRect();
		const draggedComponentPosition = monitor.getClientOffset();
		var direction;
		if(draggedComponentPosition.y<droppedComponentPosition.bottom && draggedComponentPosition.y>droppedComponentPosition.top) {
			direction = 'UP';
		} else if(draggedComponentPosition.y+Dimensions.TRIALHEIGHT<droppedComponentPosition.bottom && draggedComponentPosition.y+Dimensions.TRIALHEIGHT>droppedComponentPosition.top) {
			direction = 'DOWN';
		}
		if(draggedId !== props.id && direction) {
			props.moveNode(draggedId, props.id, direction);
		}
	}
}

function collectTarget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

@DragSource(ItemTypes.TRIAL, trialSource, collectSource)
@DropTarget(ItemTypes.TRIAL, trialTarget, collectTarget)
export default class Trial extends Component {
	constructor(props) {
		super(props);
		this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
	}
	
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		moveNode: PropTypes.func,
		moveOutside: PropTypes.func,
		selectMode: PropTypes.bool.isRequired,
		id: PropTypes.number.isRequired,
		selected: PropTypes.bool.isRequired,
		branchStyle: PropTypes.string,
		clickTrial: PropTypes.func.isRequired,
		condition: PropTypes.array.isRequired
	}
	
	handleThumbnailClick() {
		this.props.clickTrial(this.props.id);
	}
	
	renderOverlay() {
		return (
			<div style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				top: '0',
				left: '0',
				zIndex: '0',
				backgroundColor: 'red',
				opacity: '0.4',
				pointerEvents: 'none'
			}} />
		)
	}
	
	render() {
		const { connectDragSource, connectDropTarget, isDragging, selectMode, condition, id, selected, branchStyle, clickTrial } = this.props;

		const conditionList = [];
		
		for(let i=0; i<condition.length; i++) {
			conditionList.push(
				<HorizontalBar key={condition[i]} backgroundColor={condition[i]} />
			)
		}
		
		if(selectMode) {
			return (
				<div style={style}>
					<Thumbnail id={id} condition={condition} onThumbnailClick={this.handleThumbnailClick} />
					<div style={branchStyle?branch[branchStyle]:{}} />
					<div style={conditionStyle}>
						{conditionList}
					</div>
					{selected && this.renderOverlay()}
				</div>
			)
		} else {
			const opacity = isDragging ? 0 : 1;
			
			const conditionList = [];
			
			for(let i=0; i<condition.length; i++) {
				conditionList.push(
					<HorizontalBar key={condition[i]} backgroundColor={condition[i]} />
				)
			}
			
			return connectDropTarget(
				<div style={style}>
					{connectDragSource(
						<div>
							<Thumbnail id={id} condition={condition} onThumbnailClick={this.handleThumbnailClick} />
							<div style={conditionStyle}>
								{conditionList}
							</div>
						</div>
					)}
					<div style={branchStyle?branch[branchStyle]:{}} />
				</div>
			);
		}
	}
}