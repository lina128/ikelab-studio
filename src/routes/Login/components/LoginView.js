import React, { Component } from 'react'
import { login, logout, isLoggedIn } from '../../../utils/AuthService'
import Button from 'react-mdl/lib/Button'

export default class Login extends Component {
  render () {
    return (
      <div>
        <h2>Login</h2>
        {
          (isLoggedIn()) ? <Button onClick={() => logout()}>Log out</Button>
          : <Button onClick={() => login()}>Login</Button>
        }
      </div>
    )
  }
}
