import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import createSagaMiddleware from 'redux-saga'
import Sagas from './sagas'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  // const middleware = [thunk]
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__||__STG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  sagaMiddleware.run(Sagas)

  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
