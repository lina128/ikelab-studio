import React, { Component } from 'react'
import { auth0Lock } from '../../../containers/AppContainer'

export default class LoginView extends Component {
  componentDidMount () {
    auth0Lock.login()
  }

  componentWillUnmount () {
    auth0Lock.hide()
  }

  render () {
    return (
      <div id='ikelab-login' />
    )
  }
}
