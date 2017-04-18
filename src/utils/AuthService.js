import { EventEmitter } from 'events'
import auth0 from 'auth0-js'
import { browserHistory } from 'react-router'
import { TOKEN_KEY, EXPIRATION_KEY } from '../config'

export default class AuthService extends EventEmitter {
  constructor (clientId, domain) {
    super()

    this.webAuth = new auth0.WebAuth({
      domain: 'ikelab.auth0.com',
      clientID: '4HO12itCjqLZh25a2sghmjKs6E5iFUVc',
      audience: 'https://ikelab.auth0.com/userinfo',
      scope: 'openid profile',
      responseType: 'token',
      redirectUri: 'http://app2.com:1234/login'
    })

    this.login = this.login.bind(this)
    this.parseHash = this.parseHash.bind(this)
    this.setToken = this.setToken.bind(this)
  }

  _authorizationError (error) {
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  login () {
    let that = this
    this.webAuth.renewAuth({
      redirectUri: 'http://app2.com:1234/sso.html',
      usePostMessage: true
    }, function (err, authResult) {
      if (err) {
        that.webAuth.authorize()
      } else {
        console.log('renew')
        console.log(authResult)
        if (authResult && authResult.accessToken && authResult.expiresIn) {
          that.setToken(authResult.accessToken)
          that.setExpiration(authResult.expiresIn)
        }
      }
    })
  }

  parseHash () {
    let that = this
    this.webAuth.parseHash(window.location.hash, function (err, authResult) {
      if (err) {
        console.log(err)
      }

      if (authResult && authResult.accessToken) {
        that.setToken(authResult.accessToken)
        browserHistory.replace('/studio')
      }
    })
  }

  loggedIn () {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    const expiration = this.getExpiration()

    return !!token && !(expiration <= 0)
  }

  setProfile (profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile () {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken (accessToken) {
    // Saves user token to localStorage
    localStorage.setItem(TOKEN_KEY, accessToken)
  }

  getToken () {
    // Retrieves the user token from localStorage
    return localStorage.getItem(TOKEN_KEY)
  }

  setExpiration (duration) {
    localStorage.setItem(EXPIRATION_KEY, parseInt(duration))
  }

  getExpiration () {
    return localStorage.getItem(EXPIRATION_KEY)
  }

  logout () {
    // Clear user token and profile data from localStorage
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem('profile')
    window.location.href = `${window.location.origin}`
  }
}
