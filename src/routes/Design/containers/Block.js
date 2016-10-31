import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { ItemTypes, Dimensions } from '../modules/constants';
import { DragSource, DropTarget } from 'react-dnd';
import Trial from './Trial'

const style = {
	position: 'relative',
	float: 'right',
	padding: '0px',
	cursor: 'move',
	width: Dimensions.TRIALWIDTH + 80 + 'px',
	minHeight: '30px'
}

const handleStyle = {
	position: 'absolute',
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  marginRight: '0.75rem',
  cursor: 'move'
};

const blockBranch = {
	blockBranchStyleSingle: {
		position: 'absolute',
		top: '50%',
		left: '-84px',
		width: '80px',
		height: '2px',
		borderTop: '1px solid grey',
		borderLeft: '1px solid grey',
		borderBottom: '1px solid grey'
	},
	blockBranchStyleTop: {
		position: 'absolute',
		top: '46px',
		bottom: '0px',
		left: '-84px',
		width: '80px',
		borderTop: '1px solid grey',
		borderLeft: '1px solid grey'
	},
	blockBranchStyleMiddle: {
		position: 'absolute',
		top: '0px',
		bottom: '0px',
		left: '-84px',
		width: '80px',
		borderLeft: '1px solid grey'
	},
	blockBranchStyleBottom: {
		position: 'absolute',
		top: '0px',
		bottom: '55px',
		left: '-84px',
		width: '80px',
		borderLeft: '1px solid grey',
		borderBottom: '1px solid grey'
	}
}

const blockSource = {
	beginDrag(props) {
		return { id: props.id, level: 'block' };
	},
	
	endDrag(props, monitor) {
		if(!monitor.didDrop()) {
			props.moveOutside(props.id);
		}
	}
}

const blockTarget = {
	hover(props, monitor, component) {
		if(monitor.getItem().level === 'trial' && props.children.length === 0) {
			//drop trial into block
			props.moveInside(monitor.getItem().id, props.id);
		} else if(monitor.getItem().level === 'block') {
			//drop block onto block
			const draggedId = monitor.getItem().id;
			const droppedComponentPosition = ReactDOM.findDOMNode(component).getBoundingClientRect();
			const draggedComponentPosition = monitor.getSourceClientOffset();
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
}

function collectTarget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	}
}

@DragSource(ItemTypes.BLOCK, blockSource, collectSource)
@DropTarget([ItemTypes.BLOCK, ItemTypes.TRIAL], blockTarget, collectTarget)
export default class Block extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		selectMode: PropTypes.bool.isRequired,
		id: PropTypes.number.isRequired,
		color: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		branchStyle: PropTypes.string,
		children: PropTypes.array.isRequired,
		moveNode: PropTypes.func,
		moveOutside: PropTypes.func
	}
	
	render() {
		const { connectDragSource, connectDragPreview, isDragging, connectDropTarget, selectMode, id, color, name, branchStyle, children, moveNode, moveOutside, moveInside, clickTrial } = this.props;
		
		if(selectMode) {
			const blockTrials = [];

			for(let i=0; i<children.length; i++) {
				if(children.length === 1) {
					blockTrials.push(
						<Trial key={children[i].id} selectMode={selectMode} condition={children[i].condition} id={children[i].id} selected={children[i].selected} branchStyle={'trialBranchStyleSingle'} clickTrial={clickTrial} />
					);
				} else {
					if(i === 0) {
						blockTrials.push(
							<Trial key={children[i].id} selectMode={selectMode} condition={children[i].condition} id={children[i].id} selected={children[i].selected} branchStyle={'trialBranchStyleTop'} clickTrial={clickTrial} />
						);
					} else if(i === children.length-1) {
						blockTrials.push(
							<Trial key={children[i].id} selectMode={selectMode} condition={children[i].condition} id={children[i].id} selected={children[i].selected} branchStyle={'trialBranchStyleBottom'} clickTrial={clickTrial} />
						);
					} else {
						blockTrials.push(
							<Trial key={children[i].id} selectMode={selectMode} condition={children[i].condition} id={children[i].id} selected={children[i].selected} branchStyle={'trialBranchStyleMiddle'} clickTrial={clickTrial} />
						);
					}
				}
			}

			return (
				<div style={style}>
				<div>
					{blockTrials}	
					<div style={{
						position: 'absolute',
						top: '0px',
						left: '0px',
						fontSize: '12pt',
						fontFamily: 'Helvetica'
					}}>
						{name}
					</div>
				</div>
				<div style={branchStyle?blockBranch[branchStyle]:{}} />	
				</div>
			)
		} else {
			const opacity = isDragging ? 0 : 1;
	
			const blockTrials = [];

			for(let i=0; i<children.length; i++) {
				if(children.length === 1) {
					blockTrials.push(
						<Trial key={children[i].id} selectMode={selectMode} condition={children[i].condition} id={children[i].id} selected={children[i].selected} branchStyle={'trialBranchStyleSingle'} moveNode={moveNode} moveOutside={moveOutside} clickTrial={clickTrial} />
					);
				} else {
					if(i === 0) {
						blockTrials.push(
							<Trial key={children[i].id} selectMode={selectMode} condition={children[i].condition} id={children[i].id} selected={children[i].selected} branchStyle={'trialBranchStyleTop'} moveNode={moveNode} moveOutside={moveOutside} clickTrial={clickTrial} />
						);
					} else if(i === children.length-1) {
						blockTrials.push(
							<Trial key={children[i].id} selectMode={selectMode} condition={children[i].condition} id={children[i].id} selected={children[i].selected} branchStyle={'trialBranchStyleBottom'} moveNode={moveNode} moveOutside={moveOutside} clickTrial={clickTrial} />
						);
					} else {
						blockTrials.push(
							<Trial key={children[i].id} selectMode={selectMode} condition={children[i].condition} id={children[i].id} selected={children[i].selected} branchStyle={'trialBranchStyleMiddle'} moveNode={moveNode} moveOutside={moveOutside} clickTrial={clickTrial} />
						);
					}
				}
			}

			return connectDropTarget(
				<div style={style}>
				{connectDragSource(
				<div style={{ opacity }}>
					{blockTrials}	
					<div style={{
						position: 'absolute',
						top: '0px',
						left: '0px',
						fontSize: '12pt',
						fontFamily: 'Helvetica'
					}}>
						{name}
					</div>
				</div>
				)}
				<div style={branchStyle?blockBranch[branchStyle]:{}} />	
				</div>
			);
		}
	}
}