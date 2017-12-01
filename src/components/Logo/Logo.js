import React, { Component } from 'react'
import LogoImage from '../../assets/logo.jpg'
import './Logo.scss'

export default class Logo extends Component {
  render () {
    return (
      <div>
        <img alt='IKEHIVE' className='logo' src={LogoImage} />
      </div>
    )
  }
}
