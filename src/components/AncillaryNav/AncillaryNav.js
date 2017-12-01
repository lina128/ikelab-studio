import React, { Component } from 'react'
import { Link } from 'react-router'
import './AncillaryNav.scss'

export default class AncillaryNav extends Component {
  render () {
    return (
      <div className='ancillaryNav'>
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
