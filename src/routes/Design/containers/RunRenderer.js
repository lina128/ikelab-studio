import React, { PropTypes, Component } from 'react'
import BlockRenderer from './BlockRenderer'
import IconToggle from 'react-mdl/lib/IconToggle'
import './RunRenderer.scss'

export default class RunRenderer extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    runSetting: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    entities: PropTypes.array.isRequired
  }

  render () {
    const {
      name,
      runSetting,
      children,
      entities } = this.props

    const runBlocks = []

    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        runBlocks.push(
          <BlockRenderer
            key={children[i].id}
            id={children[i].id}
            name={children[i].name}
            blockSetting={children[i].blockSetting}
            branchStyle={'design_blockRenderer_branch_single'}
            children={children[i].children}
            entities={entities} />
        )
      } else {
        if (i === 0) {
          runBlocks.push(
            <BlockRenderer
              key={children[i].id}
              id={children[i].id}
              name={children[i].name}
              blockSetting={children[i].blockSetting}
              branchStyle={'design_blockRenderer_branch_top'}
              children={children[i].children}
              entities={entities} />
          )
        } else if (i === children.length - 1) {
          runBlocks.push(
            <BlockRenderer
              key={children[i].id}
              id={children[i].id}
              name={children[i].name}
              blockSetting={children[i].blockSetting}
              branchStyle={'design_blockRenderer_branch_bottom'}
              children={children[i].children}
              entities={entities} />
          )
        } else {
          runBlocks.push(
            <BlockRenderer
              key={children[i].id}
              id={children[i].id}
              name={children[i].name}
              blockSetting={children[i].blockSetting}
              branchStyle={'design_blockRenderer_branch_middle'}
              children={children[i].children} />
          )
        }
      }
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
              checked={runSetting.randomized} />
            <IconToggle name='A/B' ripple checked={runSetting.counterbalanced} />
          </div>
        </div>
      </div>
    )
  }
}
