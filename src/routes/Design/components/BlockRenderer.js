import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import TrialRenderer from './TrialRenderer'
import './BlockRenderer.scss'

const defaultArr = []

export default class BlockRenderer extends PureComponent {
  constructor (props) {
    super(props)
    this.renderBlockTrials = this.renderBlockTrials.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    branchStyle: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired
  }

  renderBlockTrials () {
    const { children, entity } = this.props
    let blockTrials = []

    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        blockTrials.push(
          <TrialRenderer
            key={children[i].id}
            id={children[i].id}
            branchStyle={'design_trialRenderer_branch_single'}
            entity={entity} />
        )
      } else {
        if (i === 0) {
          blockTrials.push(
            <TrialRenderer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_trialRenderer_branch_top'}
              entity={entity} />
          )
        } else if (i === children.length - 1) {
          blockTrials.push(
            <TrialRenderer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_trialRenderer_branch_bottom'}
              entity={entity} />
          )
        } else {
          blockTrials.push(
            <TrialRenderer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_trialRenderer_branch_middle'}
              entity={entity} />
          )
        }
      }
    }

    return blockTrials
  }

  render () {
    const {
      id,
      branchStyle,
      entity } = this.props

    const classnames = classNames('design_blockRenderer_branch', branchStyle)

    let blockTrials = this.renderBlockTrials()
    if (blockTrials.length === 0) {
      blockTrials = defaultArr
    }

    const name = entity[id].name

    return (
      <div className={'design_blockRenderer_default'}>
        {blockTrials}
        <div className={'design_blockRenderer_decorate'}>
          {name}
        </div>
        <div className={classnames} />
      </div>
    )
  }
}
