import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Input from './Input'
import Trial from '../containers/Trial'
import IconButton from 'react-mdl/lib/IconButton'
import IconToggle from 'react-mdl/lib/IconToggle'
import './Block.scss'

export default class Block extends Component {
  constructor (props) {
    super(props)
    this.handleChangeBlockRandomization = this.handleChangeBlockRandomization.bind(this)
    this.handleChangeBlockRepeat = this.handleChangeBlockRepeat.bind(this)
    this.handleChangeBlockLockTop = this.handleChangeBlockLockTop.bind(this)
    this.handleChangeBlockLockBottom = this.handleChangeBlockLockBottom.bind(this)
    this.handleDeleteNode = this.handleDeleteNode.bind(this)
  }

  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    selectMode: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    blockSetting: PropTypes.object.isRequired,
    branchStyle: PropTypes.string,
    children: PropTypes.array.isRequired,
    moveNode: PropTypes.func,
    moveOutside: PropTypes.func,
    changeBlockSetting: PropTypes.func,
    deleteNode: PropTypes.func,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired
  }

  handleChangeBlockRandomization () {
    this.props.changeBlockSetting(this.props.id, { randomized: !this.props.blockSetting.randomized })
  }

  handleChangeBlockRepeat (event) {
    this.props.changeBlockSetting(this.props.id, { repeat: event.target.value })
  }

  handleChangeBlockLockTop (event) {
    this.props.changeBlockSetting(this.props.id, { lockTop: !this.props.blockSetting.lockTop })
  }

  handleChangeBlockLockBottom (event) {
    this.props.changeBlockSetting(this.props.id, { lockBottom: !this.props.blockSetting.lockBottom })
  }

  handleDeleteNode () {
    this.props.deleteNode(this.props.id)
  }

  render () {
    const {
      connectDragSource,
      isDragging,
      connectDropTarget,
      selectMode,
      name,
      blockSetting,
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
                  <IconToggle name='autorenew' ripple checked={blockSetting.randomized} disabled />
                  <Input
                    value={blockSetting.repeat}
                    customStyle={{ marginLeft: '10px', width: '20px', border: 'none' }}
                    onBlur={() => {}}
                    disabled />
                  <IconToggle name='vertical_align_top' ripple checked={blockSetting.lockTop} disabled />
                  <IconToggle name='vertical_align_bottom' ripple checked={blockSetting.lockBottom} disabled />
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
                    checked={blockSetting.randomized}
                    onChange={this.handleChangeBlockRandomization} />
                  <Input
                    value={blockSetting.repeat}
                    customStyle={{ marginLeft: '10px', width: '20px', border: 'none' }}
                    onBlur={this.handleChangeBlockRepeat} />
                  <IconToggle
                    name='vertical_align_top'
                    ripple
                    checked={blockSetting.lockTop}
                    onChange={this.handleChangeBlockLockTop} />
                  <IconToggle
                    name='vertical_align_bottom'
                    ripple
                    checked={blockSetting.lockBottom}
                    onChange={this.handleChangeBlockLockBottom} />
                  <IconButton name='delete' accent ripple onClick={this.handleDeleteNode} />
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
