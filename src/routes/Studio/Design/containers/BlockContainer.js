import ReactDOM from 'react-dom'
import flow from 'lodash/flow'
import { ITEMTYPES } from '../constants'
import { DragSource, DropTarget } from 'react-dnd'
import Block from '../components/Block'

const blockSource = {
  beginDrag (props) {
    return { id: props.id, level: 'block' }
  }
}

const blockTarget = {
  hover (props, monitor, component) {
    if (monitor.getItem().level === 'trial' && props.children.length === 0) {
      // drop trial into block
      props.moveInside(monitor.getItem().id, props.id)
    } else if (monitor.getItem().level === 'block') {
      // drop block onto block
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
  DragSource(ITEMTYPES.BLOCK, blockSource, collectSource),
  DropTarget([ITEMTYPES.BLOCK, ITEMTYPES.TRIAL], blockTarget, collectTarget)
)(Block)
