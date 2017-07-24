import React, { Component, PropTypes } from 'react'

export default class ListItem extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <li>
        {this.props.children}
      </li>
    )
  }
}
