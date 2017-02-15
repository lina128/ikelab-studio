import React, { Component, PropTypes } from 'react'

export default class DefaultDisplay extends Component {
  static propTypes = {
    trial: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
				TEST
			</div>
    )
  }
}
