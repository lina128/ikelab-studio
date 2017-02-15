import React, { Component } from 'react'
import './Sidebar.scss'

export default class Sidebar extends Component {
  render () {
    return (
      <div className='design_sidebar_default'>
        {this.props.children}
      </div>
    )
  }
}
