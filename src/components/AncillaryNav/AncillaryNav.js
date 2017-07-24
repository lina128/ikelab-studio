import React, { Component } from 'react'
import { Link } from 'react-router'
import { auth0 } from '../../containers/AppContainer'
import './AncillaryNav.scss'

export default class AncillaryNav extends Component {
  render () {
    return (
      <div className='ancillaryNav'>
        <Link to='http://aboutus'>
          About Us
        </Link>
        { ' · ' }
        <Link to='http://help'>
          Help
        </Link>
        { ' · ' }
        { auth0.loggedIn() ? <a onClick={auth0.logout}>
          Log Out </a>
          : <a onClick={auth0.login}>
          Log In </a>}
      </div>
    )
  }
}
