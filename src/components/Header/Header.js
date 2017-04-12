import React from 'react'
import {
  IndexLink,
  Link
} from 'react-router'
import { auth0Lock } from '../../containers/AppContainer'
import './Header.scss'

export const Header = () => (
  <div>
    <h1> IKELAB </h1>
    <IndexLink to='/' activeClassName='route--active' >
      Home
    </IndexLink>
    { ' · ' }
    <Link to='/studio' activeClassName='route--active' >
      Studio
    </Link>
    { ' · ' }
    {auth0Lock.loggedIn() ? <a onClick={() => { auth0Lock.logout() }}>Log Out</a>
      : <Link to='/login' activeClassName='route--active' >
      Log In
    </Link>}
  </div>
)

export default Header
