import React, { Component, PropTypes } from 'react'
import './DefaultDisplay.scss'

export default class DefaultDisplay extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    trial: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='design_frames_default' />
    )
  }
}
