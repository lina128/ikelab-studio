import React, { Component, PropTypes } from 'react'

export default class List extends Component {
  static propTypes = {
    customStyle: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    const { customStyle } = this.props
    return (
      <ul style={customStyle}>
        {this.props.children}
      </ul>
    )
  }
}
