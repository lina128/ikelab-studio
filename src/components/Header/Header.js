import React from 'react'
import {
  IndexLink,
  Link
} from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1> TEST TEST </h1>
    <IndexLink to='/' activeClassName='route--active' >
      Home
    </IndexLink>
    { ' · ' }
    <Link to='/design' activeClassName='route--active' >
      Design
    </Link>
  </div>
)

export default Header
