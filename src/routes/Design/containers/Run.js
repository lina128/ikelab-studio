import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { ItemTypes, Dimensions } from '../modules/constants';
import { DropTarget } from 'react-dnd';
import Block from './Block';


const style = {
	position: 'relative',
	float: 'right',
	padding: '0px',
	cursor: 'move',
	width: Dimensions.TRIALWIDTH + 160 + 'px',
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

const runTarget = {
	hover(props, monitor, component) {
		if(monitor.getItem().level === 'block' && props.children.length === 0) { 
			props.moveInside(monitor.getItem().id, props.id);
		}
	}
}

function collectTarget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

@DropTarget(ItemTypes.BLOCK, runTarget, collectTarget)
export default class Run extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		selectMode: PropTypes.bool.isRequired,
		id: PropTypes.number.isRequired,
		color: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		children: PropTypes.array.isRequired,
		moveNode: PropTypes.func,
		moveOutside: PropTypes.func,
		moveInside: PropTypes.func
	}
	
	render() {
		const { connectDropTarget, selectMode, id, color, name, children, moveNode, moveOutside, moveInside, clickTrial } = this.props;
		
		if(selectMode) {
			const runBlocks = [];
	
			for(let i=0; i<children.length; i++) {
				if(children.length === 1) {
					runBlocks.push(
						<Block key={children[i].id} selectMode={selectMode} id={children[i].id} color={children[i].color} name={children[i].name} branchStyle={'blockBranchStyleSingle'} children={children[i].children} clickTrial={clickTrial} />
					)
				} else {
					if(i === 0) {
						runBlocks.push(
							<Block key={children[i].id} selectMode={selectMode} id={children[i].id} color={children[i].color} name={children[i].name} branchStyle={'blockBranchStyleTop'} children={children[i].children} clickTrial={clickTrial} />
						)
					} else if(i === children.length-1) {
						runBlocks.push(
							<Block key={children[i].id} selectMode={selectMode} id={children[i].id} color={children[i].color} name={children[i].name} branchStyle={'blockBranchStyleBottom'} children={children[i].children} clickTrial={clickTrial} />
						)
					} else {
						runBlocks.push(
							<Block key={children[i].id} selectMode={selectMode} id={children[i].id} color={children[i].color} name={children[i].name} branchStyle={'blockBranchStyleMiddle'} children={children[i].children} clickTrial={clickTrial} />
						)
					}
				}
			}

			return (
				<div style={style}>
					{runBlocks}
					<div style={{
						position: 'absolute',
						top: '20px',
						left: '0px',
						fontSize: '12pt',
						fontFamily: 'Helvetica'
					}}>
						{name}
					</div>
				</div>
			)
		} else {
			const runBlocks = [];
	
			for(let i=0; i<children.length; i++) {
				if(children.length === 1) {
					runBlocks.push(
						<Block key={children[i].id} selectMode={selectMode} id={children[i].id} color={children[i].color} name={children[i].name} branchStyle={'blockBranchStyleSingle'} children={children[i].children} moveNode={moveNode} moveOutside={moveOutside} moveInside={moveInside} clickTrial={clickTrial} />
					)
				} else {
					if(i === 0) {
						runBlocks.push(
							<Block key={children[i].id} selectMode={selectMode} id={children[i].id} color={children[i].color} name={children[i].name} branchStyle={'blockBranchStyleTop'} children={children[i].children} moveNode={moveNode} moveOutside={moveOutside} moveInside={moveInside} clickTrial={clickTrial} />
						)
					} else if(i === children.length-1) {
						runBlocks.push(
							<Block key={children[i].id} selectMode={selectMode} id={children[i].id} color={children[i].color} name={children[i].name} branchStyle={'blockBranchStyleBottom'} children={children[i].children} moveNode={moveNode} moveOutside={moveOutside} moveInside={moveInside} clickTrial={clickTrial} />
						)
					} else {
						runBlocks.push(
							<Block key={children[i].id} selectMode={selectMode} id={children[i].id} color={children[i].color} name={children[i].name} branchStyle={'blockBranchStyleMiddle'} children={children[i].children} moveNode={moveNode} moveOutside={moveOutside} moveInside={moveInside} clickTrial={clickTrial} />
						)
					}
				}
			}

			return connectDropTarget(
				<div style={style}>
					{runBlocks}
					<div style={{
						position: 'absolute',
						top: '20px',
						left: '0px',
						fontSize: '12pt',
						fontFamily: 'Helvetica'
					}}>
						{name}
					</div>
				</div>
			)
		}
	}
}