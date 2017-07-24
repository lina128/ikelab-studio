import { EventEmitter } from 'events'
import auth0 from 'auth0-js'
import { browserHistory } from 'react-router'

const PROFILE = 'profile'
const TOKEN_KEY = 'access_token'
const EXPIRATION_KEY = 'expires_in'

export default class AuthService extends EventEmitter {
  constructor (clientId, domain) {
    super()

    this.webAuth = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      audience: AUTH0_AUDIENCE,
      scope: 'openid',
      responseType: 'token',
      redirectUri: 'http://app2.com:1234/login'
    })

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.parseHash = this.parseHash.bind(this)
    this.setToken = this.setToken.bind(this)
  }

  login () {
    let that = this
    console.log('logging you in')
    this.webAuth.renewAuth({
      redirectUri: 'http://app2.com:1234/sso.html',
      usePostMessage: true
    }, function (err, authResult) {
      if (err) {
        that.webAuth.authorize()
      } else {
        console.log(authResult)
        if (authResult && authResult.accessToken && authResult.expiresIn) {
          that.setToken(authResult.accessToken)
          that.setExpiration(authResult.expiresIn)
          that.webAuth.client.userInfo(authResult.accessToken, function (err, user) {
            if (err) {
              console.log(err)
            } else {
              that.setProfile(user)
            }
          })
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
        that.webAuth.client.userInfo(authResult.accessToken, function (err, user) {
          if (err) {
            console.log(err)
          } else {
            that.setProfile(user)
          }
        })
        browserHistory.replace('/home')
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
    localStorage.setItem(PROFILE, JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile () {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem(PROFILE)
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
    this.webAuth.logout({
      returnTo: `${window.location.origin}`,
      client_id: AUTH0_CLIENT_ID
    })
    // Clear user token and profile data from localStorage
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(PROFILE)
  }
}
