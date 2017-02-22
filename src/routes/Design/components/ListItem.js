import React, { Component, PropTypes } from 'react'

export default class ListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    const { id } = this.props
    return (
      <li id={id}>
        {this.props.children}
      </li>
    )
  }
}
