import ReactDOM from 'react-dom'
import flow from 'lodash/flow'
import { ITEMTYPES, DIMENSIONS } from '../constants'
import { DragSource, DropTarget } from 'react-dnd'
import Trial from '../components/Trial'

const trialSource = {
  beginDrag (props) {
    return { id: props.id, level: 'trial' }
  }
}

const trialTarget = {
  hover (props, monitor, component) {
    const draggedId = monitor.getItem().id
    const droppedComponentPosition = ReactDOM.findDOMNode(component).getBoundingClientRect()
    const draggedComponentPosition = monitor.getClientOffset()
    const draggedComponentInitialPosition = monitor.getInitialClientOffset()
    var direction
    if (draggedComponentInitialPosition.y >
        draggedComponentPosition.y &&
        draggedComponentPosition.y <
        droppedComponentPosition.bottom) {
      direction = 'UP'
    } else if (draggedComponentInitialPosition.y <
               draggedComponentPosition.y &&
               draggedComponentPosition.y >
               droppedComponentPosition.top) {
      direction = 'DOWN'
    }
    if (draggedId !== props.id && direction) {
      props.moveNode(draggedId, props.id, direction)
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
  DragSource(ITEMTYPES.TRIAL, trialSource, collectSource),
  DropTarget(ITEMTYPES.TRIAL, trialTarget, collectTarget)
)(Trial)
