import React, { Component, PropTypes } from 'react'
import './ThirdColumn.scss'

export default class ThirdColumn extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className='design_thirdColumn_default'>
        {this.props.children}
      </div>)
  }
}
