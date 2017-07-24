import React, { Component, PropTypes } from 'react'
import './DefaultDisplay.scss'

export default class Image extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    trial: PropTypes.object.isRequired
  }

  render () {
    const { trial } = this.props

    let style = {}

    switch (trial.setting.alignH) {
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

    switch (trial.setting.alignV) {
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

    if (trial.setting.width) {
      itemStyle.width = trial.setting.width + 'px'
    }

    if (trial.setting.height) {
      itemStyle.height = trial.setting.height + 'px'
    }

    return (
      <div className='design_frames_default' style={style} >
        {trial.setting.image ? <img src={trial.setting.image} style={itemStyle} /> : null}
      </div>
    )
  }
}
