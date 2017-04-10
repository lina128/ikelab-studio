import React, { Component, PropTypes } from 'react'
import DesignView from '../containers/DesignView'

export default class Design extends Component {
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
        <DesignView />
      </div>
    )
  }
}
