import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import TrialRenderer from './TrialRenderer'
import IconToggle from 'react-mdl/lib/IconToggle'
import './BlockRenderer.scss'

const defaultArr = []

export default class BlockRenderer extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    blockSetting: PropTypes.object.isRequired,
    branchStyle: PropTypes.string,
    children: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired
  }

  render () {
    const {
      name,
      blockSetting,
      branchStyle,
      children,
      entity } = this.props

    const classnames = classNames('design_blockRenderer_branch', branchStyle)

    let blockTrials = []

    for (let i = 0; i < children.length; i++) {
      let node = entity[children[i].id]

      if (children.length === 1) {
        blockTrials.push(
          <TrialRenderer
            key={children[i].id}
            condition={node.condition}
            id={children[i].id}
            screenshot={children[i].screenshot}
            branchStyle={'design_trialRenderer_branch_single'}
            setting={node.trialSetting} />
        )
      } else {
        if (i === 0) {
          blockTrials.push(
            <TrialRenderer
              key={children[i].id}
              condition={node.condition}
              id={children[i].id}
              screenshot={children[i].screenshot}
              branchStyle={'design_trialRenderer_branch_top'}
              setting={node.trialSetting} />
          )
        } else if (i === children.length - 1) {
          blockTrials.push(
            <TrialRenderer
              key={children[i].id}
              condition={node.condition}
              id={children[i].id}
              screenshot={children[i].screenshot}
              branchStyle={'design_trialRenderer_branch_bottom'}
              setting={node.trialSetting} />
          )
        } else {
          blockTrials.push(
            <TrialRenderer
              key={children[i].id}
              condition={node.condition}
              id={children[i].id}
              screenshot={children[i].screenshot}
              branchStyle={'design_trialRenderer_branch_middle'}
              setting={node.trialSetting} />
          )
        }
      }
    }

    if (blockTrials.length === 0) {
      blockTrials = defaultArr
    }

    return (
      <div className={'design_blockRenderer_default'}>
        {blockTrials}
        <div className={'design_blockRenderer_decorate'}>
          {name}
          <div className={'design_blockRenderer_verticalDecoration'}>
            <IconToggle
              name='autorenew'
              ripple
              checked={blockSetting.randomized} />
            <div className='design_blockRenderer_divBox'>
              {blockSetting.repeat}
            </div>
            <IconToggle
              name='vertical_align_top'
              ripple
              checked={blockSetting.lockTop} />
            <IconToggle
              name='vertical_align_bottom'
              ripple
              checked={blockSetting.lockBottom} />
          </div>
        </div>
        <div className={classnames} />
      </div>
    )
  }
}