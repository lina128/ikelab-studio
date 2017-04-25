import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import TrialContainer from '../containers/TrialContainer'
import './Block.scss'

export default class Block extends PureComponent {
  constructor (props) {
    super(props)
    this.handleChangeBlockRandomization = this.handleChangeBlockRandomization.bind(this)
    this.handleChangeBlockRepeat = this.handleChangeBlockRepeat.bind(this)
    this.handleChangeBlockLockTop = this.handleChangeBlockLockTop.bind(this)
    this.handleChangeBlockLockBottom = this.handleChangeBlockLockBottom.bind(this)
    this.handleDeleteNode = this.handleDeleteNode.bind(this)
    this.renderBlockTrials = this.renderBlockTrials.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    branchStyle: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveNode: PropTypes.func.isRequired,
    changeSetting: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired
  }

  handleChangeBlockRandomization () {
    const { id, entity } = this.props
    this.props.changeSetting(id, { randomized: !entity[id].setting.randomized })
  }

  handleChangeBlockRepeat (event) {
    const { id } = this.props
    this.props.changeSetting(id, { repeat: event.target.value })
  }

  handleChangeBlockLockTop (event) {
    const { id, entity } = this.props
    this.props.changeSetting(id, { lockTop: !entity[id].setting.lockTop })
  }

  handleChangeBlockLockBottom (event) {
    const { id, entity } = this.props
    this.props.changeSetting(id, { lockBottom: !entity[id].setting.lockBottom })
  }

  handleDeleteNode () {
    this.props.deleteNode(this.props.id)
  }

  renderBlockTrials () {
    const { children, entity, moveNode, clickTrial } = this.props
    const blockTrials = []

    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        blockTrials.push(
          <TrialContainer
            key={children[i].id}
            id={children[i].id}
            branchStyle={'design_trial_branch_single'}
            entity={entity}
            clickTrial={clickTrial}
            moveNode={moveNode} />
        )
      } else {
        if (i === 0) {
          blockTrials.push(
            <TrialContainer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_trial_branch_top'}
              entity={entity}
              clickTrial={clickTrial}
              moveNode={moveNode} />
          )
        } else if (i === children.length - 1) {
          blockTrials.push(
            <TrialContainer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_trial_branch_bottom'}
              entity={entity}
              clickTrial={clickTrial}
              moveNode={moveNode} />
          )
        } else {
          blockTrials.push(
            <TrialContainer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_trial_branch_middle'}
              entity={entity}
              clickTrial={clickTrial}
              moveNode={moveNode} />
          )
        }
      }
    }

    return blockTrials
  }

  render () {
    const {
      connectDragSource,
      isDragging,
      connectDropTarget,
      id,
      entity,
      branchStyle } = this.props

    const classnames = classNames('design_block_branch', branchStyle)

    const blockTrials = this.renderBlockTrials()

    const opacity = isDragging ? 0 : 1
    const name = entity[id].name

    return connectDropTarget(
      <div className={'design_block_default'}>
        {connectDragSource(
          <div style={{ opacity }}>
            {blockTrials}
            <div className={'design_block_decorate'}>
              {name}
            </div>
          </div>
        )}
        <div className={classnames} />
      </div>
    )
  }
}
