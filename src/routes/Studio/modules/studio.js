import * as handle from './handlers'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

// ------------------------------------
// Actions
// ------------------------------------
export const addMessage = (id, msg) => {
  return {
    type: ADD_MESSAGE,
    payload: {
      id: id,
      html: msg
    }
  }
}

export const deleteMessage = (id) => {
  return {
    type: DELETE_MESSAGE,
    payload: { id }
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

/*
export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}
*/

export const actions = {
  addMessage,
  deleteMessage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_MESSAGE] : handle.addMessage,
  [DELETE_MESSAGE] : handle.deleteMessage
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  messages: []
}

export default function designReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
