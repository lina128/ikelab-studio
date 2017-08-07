import React, { Component, PropTypes } from 'react'
import StudioNav from '../../components/StudioNav'
import '../../../../styles/core.scss'
import './CoreLayout.scss'

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
        <StudioNav />
        <div className='core-layout__studio'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
