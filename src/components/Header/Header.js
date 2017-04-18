import React, { Component } from 'react'
import {
  IndexLink,
  Link
} from 'react-router'
import './Header.scss'
import { auth0 } from '../../containers/AppContainer'

export default class Header extends Component {
  render () {
    return (
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
        { auth0.loggedIn() ? <a onClick={auth0.logout}>
          Log Out </a>
          : <a onClick={auth0.login}>
          Log In </a>}
      </div>
    )
  }
}
