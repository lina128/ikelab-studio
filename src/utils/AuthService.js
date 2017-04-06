import decode from 'jwt-decode'
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import { BASE_URL, ID_TOKEN_KEY } from '../config'
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../secret'

const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
  auth: {
    redirectUrl: `${BASE_URL}/login`,
    responseType: 'token'
  }
})

lock.on('authenticated', authResult => {
  setIdToken(authResult.idToken)
  browserHistory.push('/home')
})

export function login (options) {
  lock.show(options)

  return {
    hide () {
      lock.hide()
    }
  }
}

export function logout () {
  clearIdToken()
  browserHistory.replace('/login')
}

export function requireAuth (nextState, replace, callback) {
  if (!isLoggedIn()) {
    replace({ pathname: '/login' })
    callback()
  } else {
    callback()
  }
}

function setIdToken (idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

export function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
