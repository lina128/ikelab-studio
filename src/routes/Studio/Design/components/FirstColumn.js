import React, { Component, PropTypes } from 'react'
import './FirstColumn.scss'

export default class FirstColumn extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className={'design_firstColumn_default'}>
        {this.props.children}
      </div>
    )
  }
}
