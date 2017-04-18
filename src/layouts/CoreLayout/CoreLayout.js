import React, { Component, PropTypes } from 'react'
import Header from '../../components/Header'
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
        <Header />
        <div className='core-layout__viewport'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
