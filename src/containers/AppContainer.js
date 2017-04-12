import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import AuthService from '../utils/AuthService'

export const auth0Lock = new AuthService('4HO12itCjqLZh25a2sghmjKs6E5iFUVc', 'ikelab.auth0.com')

export const requireAuth = (nextState, replace) => {
  if (!auth0Lock.loggedIn()) {
    replace('/login')
  }
}

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} auth={auth0Lock} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
