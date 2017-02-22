import React, { Component, PropTypes } from 'react'
import './CenterFrame.scss'

export default class CenterFrame extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className='design_centerFrame_default'>
        {this.props.children}
      </div>)
  }
}
