import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import flow from 'lodash/flow'
import classNames from 'classnames'
import { ITEMTYPES, DIMENSIONS } from '../constants'
import { DragSource, DropTarget } from 'react-dnd'
import Badge from 'react-mdl/lib/Badge'
import Thumbnail from '../components/Thumbnail'
import Sidebar from '../components/Sidebar'
import HorizontalBar from '../components/HorizontalBar'
import './Trial.scss'

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

export class Trial extends Component {
  constructor (props) {
    super(props)
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this)
  }

  static propTypes = {
    moveNode: PropTypes.func,
    moveOutside: PropTypes.func,
    selectMode: PropTypes.bool.isRequired,
    condition: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    screenshot: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    branchStyle: PropTypes.string,
    clickTrial: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  }

  handleThumbnailClick () {
    this.props.clickTrial(this.props.id)
  }

  renderOverlay () {
    return (
      <div className={'design_trial_overlay'} />
    )
  }

  render () {
    const {
      connectDragSource,
      connectDropTarget,
      selectMode,
      condition,
      id,
      screenshot,
      selected,
      branchStyle } = this.props

    const conditionList = []

    for (let i = 0; i < condition.length; i++) {
      conditionList.push(
        <HorizontalBar key={condition[i]} backgroundColor={condition[i]} />
      )
    }

    const classnames = classNames('design_trial_branch', branchStyle)

    if (selectMode) {
      return (
        <div className='design_trial_default'>
          <Badge text={id}>
            <div>
              <Thumbnail
                id={id}
                screenshot={screenshot}
                condition={condition}
                onThumbnailClick={this.handleThumbnailClick} />
            </div>
          </Badge>
          <Sidebar>
            {conditionList}
          </Sidebar>
          <div className={classnames} />
          {selected && this.renderOverlay()}
        </div>
      )
    } else {
      const conditionList = []

      for (let i = 0; i < condition.length; i++) {
        conditionList.push(
          <HorizontalBar key={condition[i]} backgroundColor={condition[i]} />
        )
      }

      return connectDropTarget(
        <div className='design_trial_default'>
          {connectDragSource(
            <div>
              <Badge text={id}>
                <div>
                  <Thumbnail
                    id={id}
                    screenshot={screenshot}
                    condition={condition}
                    onThumbnailClick={this.handleThumbnailClick} />
                </div>
              </Badge>
              <Sidebar>
                {conditionList}
              </Sidebar>
            </div>
          )}
          <div className={classnames} />
        </div>
      )
    }
  }
}

export default flow(
  DragSource(ITEMTYPES.TRIAL, trialSource, collectSource),
  DropTarget(ITEMTYPES.TRIAL, trialTarget, collectTarget)
)(Trial)
