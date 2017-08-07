import React, { Component } from 'react'
import { Link } from 'react-router'
import { auth0 } from '../../containers/AppContainer'
import './AncillaryNav.scss'

export default class AncillaryNav extends Component {
  render () {
    return (
      <div className='ancillaryNav'>
        { auth0.loggedIn() ? <a className='ancillaryLink' onClick={auth0.logout}>
          Log Out </a>
          : <a className='ancillaryLink' onClick={auth0.login}>
          Log In </a>}
        <Link className='ancillaryLink' to='http://help'>
          Help Center
        </Link>
        <Link className='ancillaryLink' to='http://aboutus'>
          About Us
        </Link>
      </div>
    )
  }
}
