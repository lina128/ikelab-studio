import React, { Component, PropTypes } from 'react'
import { findNode } from '../utils/findNode'
import { Chip } from 'react-mdl/lib/Chip'
import TrialRenderer from './TrialRenderer'
import BlockRenderer from './BlockRenderer'
import RunRenderer from './RunRenderer'
import './ExperimentRenderer.scss'

export default class ExperimentRenderer extends Component {
  constructor (props) {
    super(props)
    this.renderCondition = this.renderCondition.bind(this)
    this.renderExperiment = this.renderExperiment.bind(this)
  }

  static propTypes = {
    experiment: PropTypes.object
  }

  renderCondition () {
    const { experiment } = this.props

    return (
      experiment.condition.map(c => {
        return (
          <Chip style={{ backgroundColor: c.color }}>{c.name}</Chip>
        )
      })
    )
  }

  renderExperiment () {
    const { experiment } = this.props

    return (
      experiment.structure.map(x => {
        const node = findNode(experiment.entities, x.id)
        if (x.level === 'trial') {
          return <TrialRenderer
            key={x.id}
            id={x.id}
            screenshot={x.screenshot}
            condition={x.condition}
            name={node.name}
            setting={node.trialSetting} />
        }
        if (x.level === 'block') {
          return <BlockRenderer
            key={x.id}
            id={x.id}
            name={x.name}
            blockSetting={x.blockSetting}
            children={x.children}
            entities={experiment.entities} />
        }
        if (x.level === 'run') {
          return <RunRenderer
            key={x.id}
            id={x.id}
            name={x.name}
            runSetting={x.runSetting}
            children={x.children}
            entities={experiment.entities} />
        }
      })
    )
  }

  render () {
    const experimentView = this.props.experiment ? this.renderExperiment() : null
    const conditionView = this.props.experiment ? this.renderCondition() : null

    return (
      <div>
        <div className='design_experimentRenderer_conditionPane'>
          {conditionView}
        </div>
        <div className='design_experimentRenderer_designPane'>
          {experimentView}
        </div>
      </div>
    )
  }
}
