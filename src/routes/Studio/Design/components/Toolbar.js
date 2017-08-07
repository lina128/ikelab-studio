import React, { Component, PropTypes } from 'react'
import './Toolbar.scss'

export default class Toolbar extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className='design_toolbar_default'>
        {this.props.children}
      </div>
    )
  }
}
