import React, { Component, PropTypes } from 'react'
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
    dialogOpen: PropTypes.bool.isRequired,
    experiment: PropTypes.object.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.dialogOpen !== this.props.dialogOpen) {
      return true
    } else {
      return false
    }
  }

  renderCondition () {
    const { experiment } = this.props

    const conditionList = []
    for (let id in experiment.condition) {
      conditionList.push(
        <Chip
          key={id}
          style={{ backgroundColor: experiment.condition[id].color }}>
          {experiment.condition[id].name}
        </Chip>)
    }

    return conditionList
  }

  renderExperiment () {
    const { experiment } = this.props

    return (
      experiment.structure.map(x => {
        if (x.level === 'trial') {
          return <TrialRenderer
            key={x.id}
            id={x.id}
            branchStyle={''}
            entity={experiment.entity} />
        }
        if (x.level === 'block') {
          return <BlockRenderer
            key={x.id}
            id={x.id}
            branchStyle={''}
            children={x.children}
            entity={experiment.entity} />
        }
        if (x.level === 'run') {
          return <RunRenderer
            key={x.id}
            id={x.id}
            children={x.children}
            entity={experiment.entity} />
        }
      })
    )
  }

  render () {
    let experimentView = this.props.experiment ? this.renderExperiment() : null
    let conditionView = this.props.experiment ? this.renderCondition() : null

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
