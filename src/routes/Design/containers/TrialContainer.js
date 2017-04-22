import ReactDOM from 'react-dom'
import flow from 'lodash/flow'
import { ITEMTYPES, DIMENSIONS } from '../constants'
import { DragSource, DropTarget } from 'react-dnd'
import Trial from '../components/Trial'

const trialSource = {
  beginDrag (props) {
    return { id: props.id, level: 'trial' }
  },

  endDrag (props, monitor) {
    if (!monitor.didDrop()) {
      props.moveOutside(props.id)
    }
  }
}

const trialTarget = {
  hover (props, monitor, component) {
    const draggedId = monitor.getItem().id
    const droppedComponentPosition = ReactDOM.findDOMNode(component).getBoundingClientRect()
    const draggedComponentPosition = monitor.getClientOffset()
    var direction

    if (draggedComponentPosition.y <
        droppedComponentPosition.bottom &&
        draggedComponentPosition.y >
        droppedComponentPosition.top) {
      direction = 'UP'
    } else if (((draggedComponentPosition.y +
               DIMENSIONS.TRIALHEIGHT) <
               droppedComponentPosition.bottom) &&
               ((draggedComponentPosition.y +
                DIMENSIONS.TRIALHEIGHT) >
               droppedComponentPosition.top)) {
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
