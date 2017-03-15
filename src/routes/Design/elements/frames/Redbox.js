import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import IconButton from 'react-mdl/lib/IconButton'
import { ITEMTYPES } from '../../constants'
import './Redbox.scss'

const redboxSource = {
  beginDrag (props) {
    const { id, left, top } = props
    return { id, left, top }
  }
}

function collectSource (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export class Redbox extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    grow: PropTypes.func.isRequired,
    shrink: PropTypes.func.isRequired
  }

  render () {
    const { left, top, width, height, connectDragSource, isDragging, grow, shrink } = this.props

    if (isDragging) {
      return null
    }

    return connectDragSource(
      <div className='design_redbox_default' style={{ left, top, width, height }}>
        <IconButton name='donut_large' colored style={{ position: 'absolute', top: 0, left: 0 }} onClick={grow} />
        <IconButton name='donut_small' colored style={{ position: 'absolute', top: 30, left: 0 }} onClick={shrink} />
      </div>
    )
  }
}

export default DragSource(ITEMTYPES.REDBOX, redboxSource, collectSource)(Redbox)
