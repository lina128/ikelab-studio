import { ITEMTYPES } from '../constants'
import { DropTarget } from 'react-dnd'
import Run from '../components/Run'

const runTarget = {
  hover (props, monitor, component) {
    console.log('move inside')
    if (monitor.getItem().level === 'block' && props.children.length === 0) {
      props.moveInside(monitor.getItem().id, props.id)
    }
  }
}

function collectTarget (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export default DropTarget(ITEMTYPES.BLOCK, runTarget, collectTarget)(Run)
