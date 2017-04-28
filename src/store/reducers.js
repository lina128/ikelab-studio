import { combineReducers } from 'redux'
import locationReducer from './location'
import messageReducer from './message'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    message: messageReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
