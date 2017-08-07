import React, { Component } from 'react'
import { Link } from 'react-router'
import './StudioNav.scss'

export default class StudioNav extends Component {
  render () {
    return (
      <div className='studioNav'>
        <Link className='studioLink' to='http://help'>
          Data
        </Link>
        <Link className='studioLink' to='http://aboutus'>
          Distribution
        </Link>
        <Link className='studioLink' to='http://aboutus'>
          Supplementary Material
        </Link>
        <Link className='studioLink' to='http://aboutus'>
          Design
        </Link>
      </div>
    )
  }
}
