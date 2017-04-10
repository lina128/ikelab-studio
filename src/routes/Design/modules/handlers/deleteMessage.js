const deleteMessage = (state, action) => {
  const id = action.payload.id

  for (let i = 0; i < state.messages.length; i++) {
    if (id === state.messages[i].id) {
      const newMessages = [
        ...state.messages.slice(0, i),
        ...state.messages.slice(i + 1)
      ]

      return {
        ...state,
        messages: newMessages
      }
    }
  }

  return state
}

export default deleteMessage
