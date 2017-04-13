import { combineReducers } from 'redux'
import locationReducer from './location'

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    location: locationReducer,
    ...asyncReducers
  })

  return (state, action) => {
    if (action.type === 'LOG_OUT') {
      state = undefined
    }
console.log(state)
    console.log(action)
    return appReducer(state, action)
  }
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
