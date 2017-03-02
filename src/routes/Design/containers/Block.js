import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import flow from 'lodash/flow'
import classNames from 'classnames'
import { ITEMTYPES, DIMENSIONS } from '../constants'
import { DragSource, DropTarget } from 'react-dnd'
import Trial from './Trial'
import IconToggle from 'react-mdl/lib/IconToggle'
import Input from '../components/Input'
import './Block.scss'

const blockSource = {
  beginDrag (props) {
    return { id: props.id, level: 'block' }
  },

  endDrag (props, monitor) {
    if (!monitor.didDrop()) {
      props.moveOutside(props.id)
    }
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

export class Block extends Component {
  constructor (props) {
    super(props)
    this.handleToggleBlockRandomization = this.handleToggleBlockRandomization.bind(this)
  }

  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    selectMode: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    setting: PropTypes.object.isRequired,
    branchStyle: PropTypes.string,
    children: PropTypes.array.isRequired,
    moveNode: PropTypes.func,
    moveOutside: PropTypes.func,
    toggleBlockRandomization: PropTypes.func,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired
  }

  handleToggleBlockRandomization () {
    this.props.toggleBlockRandomization(this.props.id)
  }

  render () {
    const {
      connectDragSource,
      isDragging,
      connectDropTarget,
      selectMode,
      name,
      setting,
      branchStyle,
      children,
      moveNode,
      moveOutside,
      clickTrial } = this.props

    const classnames = classNames('design_block_branch', branchStyle)

    const blockTrials = []

    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        blockTrials.push(
          <Trial
            key={children[i].id}
            selectMode={selectMode}
            condition={children[i].condition}
            id={children[i].id}
            screenshot={children[i].screenshot}
            selected={children[i].selected}
            branchStyle={'design_trial_branch_single'}
            moveNode={moveNode}
            moveOutside={moveOutside}
            clickTrial={clickTrial} />
        )
      } else {
        if (i === 0) {
          blockTrials.push(
            <Trial
              key={children[i].id}
              selectMode={selectMode}
              condition={children[i].condition}
              id={children[i].id}
              screenshot={children[i].screenshot}
              selected={children[i].selected}
              branchStyle={'design_trial_branch_top'}
              moveNode={moveNode}
              moveOutside={moveOutside}
              clickTrial={clickTrial} />
          )
        } else if (i === children.length - 1) {
          blockTrials.push(
            <Trial
              key={children[i].id}
              selectMode={selectMode}
              condition={children[i].condition}
              id={children[i].id}
              screenshot={children[i].screenshot}
              selected={children[i].selected}
              branchStyle={'design_trial_branch_bottom'}
              moveNode={moveNode}
              moveOutside={moveOutside}
              clickTrial={clickTrial} />
          )
        } else {
          blockTrials.push(
            <Trial
              key={children[i].id}
              selectMode={selectMode}
              condition={children[i].condition}
              id={children[i].id}
              screenshot={children[i].screenshot}
              selected={children[i].selected}
              branchStyle={'design_trial_branch_middle'}
              moveNode={moveNode}
              moveOutside={moveOutside}
              clickTrial={clickTrial} />
          )
        }
      }
    }

    if (selectMode) {
      return (
        <div className={'design_block_default'}>
          <div>
            {blockTrials}
            <div style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              fontSize: '12pt',
              fontFamily: 'Helvetica'
            }}>
              <div className={'design_block_decorate'}>
                {name}
                <div className={'design_block_verticalDecoration'}>
                  <IconToggle name='autorenew' ripple checked={setting.randomized} disabled />
                  <Input
                    value={setting.repeat}
                    customStyle={{ marginLeft: '10px', width: '20px', border: 'none' }}
                    onBlur={() => {}}
                    disabled />
                  <IconToggle name='vertical_align_top' ripple checked={setting.lockTop} disabled />
                  <IconToggle name='vertical_align_bottom' ripple checked={setting.lockBottom} disabled />
                  <IconToggle name='delete' ripple disabled />
                </div>
              </div>
            </div>
          </div>
          <div className={classnames} />
        </div>
      )
    } else {
      const opacity = isDragging ? 0 : 1

      return connectDropTarget(
        <div className={'design_block_default'}>
          {connectDragSource(
            <div style={{ opacity }}>
              {blockTrials}
              <div className={'design_block_decorate'}>
                {name}
                <div className={'design_block_verticalDecoration'}>
                  <IconToggle
                    name='autorenew'
                    ripple
                    checked={setting.randomized}
                    onClick={this.handleToggleBlockRandomization} />
                  <Input
                    value={setting.repeat}
                    customStyle={{ marginLeft: '10px', width: '20px', border: 'none' }}
                    onBlur={() => {}} />
                  <IconToggle name='vertical_align_top' ripple checked={setting.lockTop} />
                  <IconToggle name='vertical_align_bottom' ripple checked={setting.lockBottom} />
                  <IconToggle name='delete' ripple />
                </div>
              </div>
            </div>
          )}
          <div className={classnames} />
        </div>
      )
    }
  }
}

export default flow(
  DragSource(ITEMTYPES.BLOCK, blockSource, collectSource),
  DropTarget([ITEMTYPES.BLOCK, ITEMTYPES.TRIAL], blockTarget, collectTarget)
)(Block)
