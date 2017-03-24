let counter = 0

const addMessage = (state, action) => {
  counter = counter + 1

  const message = {
    ...action.payload,
    id: counter
  }

  return {
    ...state,
    messages: [
      ...state.messages,
      message
    ]
  }
}

export default addMessage
