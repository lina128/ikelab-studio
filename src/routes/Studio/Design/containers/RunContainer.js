import ReactDOM from 'react-dom'
import { ITEMTYPES } from '../constants'
import flow from 'lodash/flow'
import { DropTarget, DragSource } from 'react-dnd'
import Run from '../components/Run'

const runSource = {
  beginDrag (props) {
    return { id: props.id, level: 'run' }
  }
}

const runTarget = {
  hover (props, monitor, component) {
    if (monitor.getItem().level === 'block' && props.children.length === 0) {
      // drop block into run
      props.moveInside(monitor.getItem().id, props.id)
    } else if (monitor.getItem().level === 'run') {
      // drop run onto run
      const draggedId = monitor.getItem().id
      const droppedComponentPosition = ReactDOM.findDOMNode(component).getBoundingClientRect()
      const draggedComponentPosition = monitor.getSourceClientOffset()
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
  DragSource(ITEMTYPES.RUN, runSource, collectSource),
  DropTarget([ITEMTYPES.BLOCK, ITEMTYPES.RUN], runTarget, collectTarget)
)(Run)
