import React, { Component, PropTypes } from 'react'
import './SecondColumn.scss'

export default class SecondColumn extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className='design_secondColumn_default'>
        {this.props.children}
      </div>
    )
  }
}
