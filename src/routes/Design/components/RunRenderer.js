import React, { PureComponent, PropTypes } from 'react'
import BlockRenderer from './BlockRenderer'
import './RunRenderer.scss'

const defaultArr = []

export default class RunRenderer extends PureComponent {
  constructor (props) {
    super(props)
    this.renderRunBlocks = this.renderRunBlocks.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired
  }

  renderRunBlocks () {
    const { children, entity } = this.props

    let runBlocks = []

    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        runBlocks.push(
          <BlockRenderer
            key={children[i].id}
            id={children[i].id}
            branchStyle={'design_blockRenderer_branch_single'}
            children={children[i].children}
            entity={entity} />
        )
      } else {
        if (i === 0) {
          runBlocks.push(
            <BlockRenderer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_blockRenderer_branch_top'}
              children={children[i].children}
              entity={entity} />
          )
        } else if (i === children.length - 1) {
          runBlocks.push(
            <BlockRenderer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_blockRenderer_branch_bottom'}
              children={children[i].children}
              entity={entity} />
          )
        } else {
          runBlocks.push(
            <BlockRenderer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_blockRenderer_branch_middle'}
              children={children[i].children} />
          )
        }
      }
    }

    return runBlocks
  }

  render () {
    const {
      id,
      entity } = this.props

    let runBlocks = this.renderRunBlocks()

    if (runBlocks.length === 0) {
      runBlocks = defaultArr
    }

    const name = entity[id].name
    return (
      <div className='design_runRenderer_default'>
        {runBlocks}
        <div className={'design_runRenderer_decorate'}>
          {name}
        </div>
      </div>
    )
  }
}
