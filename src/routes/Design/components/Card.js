import React, { Component, PropTypes } from 'react'

const style = {
  width: '100%',
  margin: '5px',
  border: '1px solid grey'
}

export default class Card extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }
  render () {
    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}
