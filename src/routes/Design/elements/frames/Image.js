import React, { Component, PropTypes } from 'react'
import './DefaultDisplay.scss'

export default class Image extends Component {
  static propTypes = {
    trial: PropTypes.object.isRequired
  }

  render () {
    const { trial } = this.props

    let style = {}

    switch (trial.trialSetting.alignH) {
      case 'left':
        style.justifyContent = 'flex-start'
        break
      case 'center':
        style.justifyContent = 'center'
        break
      case 'right':
        style.justifyContent = 'flex-end'
        break
    }

    let itemStyle = {}

    switch (trial.trialSetting.alignV) {
      case 'top':
        itemStyle.alignSelf = 'flex-start'
        break
      case 'middle':
        itemStyle.alignSelf = 'center'
        break
      case 'bottom':
        itemStyle.alignSelf = 'flex-end'
        break
    }

    if (trial.trialSetting.width) {
      itemStyle.width = trial.trialSetting.width + 'px'
    }

    if (trial.trialSetting.height) {
      itemStyle.height = trial.trialSetting.height + 'px'
    }

    return (
      <div className='design_frames_default' style={style} >
        {trial.trialSetting.image ? <img src={trial.trialSetting.image} style={itemStyle} /> : null}
      </div>
    )
  }
}
