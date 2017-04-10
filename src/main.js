import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import auth0Js from 'auth0-js'
import AuthService from './utils/AuthService'
import AppContainer from './containers/AppContainer'

// ========================================================
// Authentication Instantiation
// ========================================================

export const webAuth = new auth0Js.WebAuth({
  domain: 'ikelab.auth0.com',
  clientID: '4HO12itCjqLZh25a2sghmjKs6E5iFUVc'
})

export const auth0Lock = new AuthService('4HO12itCjqLZh25a2sghmjKs6E5iFUVc', 'ikelab.auth0.com')

export const requireAuth = (nextState, replace) => {
  if (!auth0Lock.loggedIn()) {
    replace({ pathName: '/' })
    /*
    webAuth.renewAuth({
      audience: ,
      scope: ,
      redirectUri: ,
      usePostMessage: true
    }, function (err, authResult) {
      if (err) { console.log(err) }
      console.log(authResult)

    })
    */
  }
}

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
