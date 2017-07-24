import ReactDOM from 'react-dom'
import flow from 'lodash/flow'
import { ITEMTYPES, DIMENSIONS } from '../constants'
import { DragSource, DropTarget } from 'react-dnd'
import Block from '../components/Block'

const blockSource = {
  beginDrag (props) {
    console.log('dragging ' + props.id)
    return { id: props.id, level: 'block' }
  }
}

const blockTarget = {
  hover (props, monitor, component) {
    console.log('dropping to block')
    if (monitor.getItem().level === 'trial' && props.children.length === 0) {
      // drop trial into block
      props.moveInside(monitor.getItem().id, props.id)
    } else if (monitor.getItem().level === 'block') {
      // drop block onto block
      const draggedId = monitor.getItem().id
      const droppedComponentPosition = ReactDOM.findDOMNode(component).getBoundingClientRect()
      const draggedComponentPosition = monitor.getSourceClientOffset()
      var direction
      if (draggedComponentPosition.y <
          droppedComponentPosition.bottom && draggedComponentPosition.y > droppedComponentPosition.top) {
        direction = 'UP'
      } else if ((draggedComponentPosition.y +
                  DIMENSIONS.TRIALHEIGHT) <
                 droppedComponentPosition.bottom &&
                 (draggedComponentPosition.y +
                  DIMENSIONS.TRIALHEIGHT) >
                 droppedComponentPosition.top) {
        direction = 'DOWN'
      }
      if (draggedId !== props.id && direction) {
        props.moveNode(draggedId, props.id, direction)
      }
    }
  }
}

function collectTarget (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

function collectSource (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default flow(
  DragSource(ITEMTYPES.BLOCK, blockSource, collectSource),
  DropTarget([ITEMTYPES.BLOCK, ITEMTYPES.TRIAL], blockTarget, collectTarget)
)(Block)
