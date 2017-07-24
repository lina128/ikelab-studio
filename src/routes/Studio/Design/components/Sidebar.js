import React, { Component, PropTypes } from 'react'
import './Sidebar.scss'

export default class Sidebar extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className='design_sidebar_default'>
        {this.props.children}
      </div>
    )
  }
}
