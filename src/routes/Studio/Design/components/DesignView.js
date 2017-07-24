import React, { Component, PropTypes } from 'react'

import DesignContainer from '../containers/DesignContainer'

export default class DesignView extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div>
        {this.props.children}
        <DesignContainer fetchId={parseInt(this.props.params.experimentId)} />
      </div>
    )
  }
}
