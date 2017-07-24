import React, { Component, PropTypes } from 'react'

export default class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div>
        {this.props.children}
        <div>design studio</div>
      </div>
    )
  }
}
