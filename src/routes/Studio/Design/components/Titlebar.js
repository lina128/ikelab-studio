import React, { Component, PropTypes } from 'react'
import './Titlebar.scss'

export default class Titlebar extends Component {
  static propTypes = {
    expName: PropTypes.string,
    unitName: PropTypes.string
  }

  render () {
    const { expName, unitName } = this.props
    return (
      <div className='design_titlebar_default'>
        <span className='design_titlebar_bd'>{expName}</span>
        <span className='design_titlebar_rg'>{unitName}</span>
      </div>
    )
  }
}
