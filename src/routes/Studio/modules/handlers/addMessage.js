const addMessage = (state, action) => {
  return {
    ...state,
    messages: [
      ...state.messages,
      { ...action.payload }
    ]
  }
}

export default addMessage
