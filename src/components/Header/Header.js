import React, { Component } from 'react'
import './Header.scss'
import Logo from '../Logo'
import AncillaryNav from '../AncillaryNav'

export default class Header extends Component {
  render () {
    return (
      <div>
        <Logo />
        <AncillaryNav />
      </div>
    )
  }
}
