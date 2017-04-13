import React, { Component, PropTypes } from 'react'
import HeaderContainer from '../../containers/HeaderContainer'
import './CoreLayout.scss'
import '../../styles/core.scss'

export default class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className='container-fluid text-left'>
        <HeaderContainer />
        <div className='core-layout__viewport'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
