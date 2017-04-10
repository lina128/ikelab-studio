import React, { Component, PropTypes } from 'react'
import './Infobar.scss'

export default class Info extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className='design_infobar_default'>
        {this.props.children}
      </div>
    )
  }
}
