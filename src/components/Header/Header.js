import React, { Component, PropTypes } from 'react'
import {
  IndexLink,
  Link
} from 'react-router'
import './Header.scss'

export default class Header extends Component {
  static propTypes = {
    logOut: PropTypes.func.isRequired
  }

  render () {
    const { logOut } = this.props

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
        <Link to='/login' activeClassName='route--active' >
          Log In
        </Link>
        { ' · ' }
        <a onClick={logOut}>
          Log Out
        </a>
      </div>
    )
  }
}
