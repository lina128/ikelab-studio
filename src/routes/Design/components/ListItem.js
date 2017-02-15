import React, { Component, PropTypes } from 'react'

export default class ListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired
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
