import React, { Component, PropTypes } from 'react'
import './AbsolutePosition.scss'

export default class AbsolutePosition extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    left: PropTypes.string,
    top: PropTypes.string,
    width: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    const { isOpen, left, top, width } = this.props

    const display = isOpen ? 'inline-block' : 'none'

    return (
      <div
        className='design_absolutePosition'
        style={{ display: display, left: left, top: top, width: width }}>
        {this.props.children}
      </div>
    )
  }
}
