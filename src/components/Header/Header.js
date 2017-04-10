import React from 'react'
import { auth0Lock } from '../../main'
import {
  IndexLink,
  Link
} from 'react-router'
import Button from 'react-mdl/lib/Button'
import './Header.scss'

export const Header = () => (
  <div>
    <h1> IKELAB </h1>
    <IndexLink to='/' activeClassName='route--active' >
      Home
    </IndexLink>
    { ' · ' }
    <Link to='/counter' activeClassName='route--active' >
      Counter
    </Link>
    { ' · ' }
    <Link to='/design' activeClassName='route--active' >
      Design
    </Link>
    { ' · ' }
    { auth0Lock.loggedIn()
      ? <Button onClick={() => auth0Lock.logout()}>Log Out</Button>
      : <Button onClick={() => auth0Lock.login()}>Log In</Button>
    }
  </div>
)

export default Header
