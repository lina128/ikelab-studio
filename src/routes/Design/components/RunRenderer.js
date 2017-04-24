import React, { PureComponent, PropTypes } from 'react'
import BlockRenderer from './BlockRenderer'
import IconToggle from 'react-mdl/lib/IconToggle'
import './RunRenderer.scss'

const defaultArr = []

export default class RunRenderer extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    setting: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired
  }

  render () {
    const {
      name,
      setting,
      children,
      entity } = this.props

    let runBlocks = []

    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        runBlocks.push(
          <BlockRenderer
            key={children[i].id}
            id={children[i].id}
            name={children[i].name}
            setting={children[i].setting}
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
              name={children[i].name}
              setting={children[i].setting}
              branchStyle={'design_blockRenderer_branch_top'}
              children={children[i].children}
              entity={entity} />
          )
        } else if (i === children.length - 1) {
          runBlocks.push(
            <BlockRenderer
              key={children[i].id}
              id={children[i].id}
              name={children[i].name}
              setting={children[i].setting}
              branchStyle={'design_blockRenderer_branch_bottom'}
              children={children[i].children}
              entity={entity} />
          )
        } else {
          runBlocks.push(
            <BlockRenderer
              key={children[i].id}
              id={children[i].id}
              name={children[i].name}
              setting={children[i].setting}
              branchStyle={'design_blockRenderer_branch_middle'}
              children={children[i].children} />
          )
        }
      }
    }

    if (runBlocks.length === 0) {
      runBlocks = defaultArr
    }

    return (
      <div className='design_runRenderer_default'>
        {runBlocks}
        <div className={'design_runRenderer_decorate'}>
          {name}
          <div className={'design_runRenderer_verticalDecoration'}>
            <IconToggle
              name='autorenew'
              ripple
              checked={setting.randomized} />
            <IconToggle name='A/B' ripple checked={setting.counterbalanced} />
          </div>
        </div>
      </div>
    )
  }
}
