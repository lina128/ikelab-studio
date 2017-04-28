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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_MESSAGE] : _addMessage,
  [DELETE_MESSAGE] : _deleteMessage
}

// ------------------------------------
// Action Processors
// ------------------------------------
const _addMessage = (state, action) => {
  return {
    messages: [
      ...state.messages,
      { ...action.payload }
    ]
  }
}

const _deleteMessage = (state, action) => {
  const id = action.payload.id

  for (let i = 0; i < state.messages.length; i++) {
    if (id === state.messages[i].id) {
      const newMessages = [
        ...state.messages.slice(0, i),
        ...state.messages.slice(i + 1)
      ]

      return { messages: newMessages }
    }
  }

  return state
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  messages: []
}

export default function messageReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
