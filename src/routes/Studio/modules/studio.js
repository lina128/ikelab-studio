import * as handle from './handlers'

// ------------------------------------
// Constants
// ------------------------------------
export const STUDIO_ADD_MESSAGE = 'STUDIO_ADD_MESSAGE'
export const STUDIO_DELETE_MESSAGE = 'STUDIO_DELETE_MESSAGE'

// ------------------------------------
// Actions
// ------------------------------------
export const addMessage = (id, msg) => {
  return {
    type: STUDIO_ADD_MESSAGE,
    payload: {
      id: id,
      html: msg
    }
  }
}

export const deleteMessage = (id) => {
  return {
    type: STUDIO_DELETE_MESSAGE,
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
  [STUDIO_ADD_MESSAGE] : handle.addMessage,
  [STUDIO_DELETE_MESSAGE] : handle.deleteMessage
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  messages: []
}

export default function studioReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
