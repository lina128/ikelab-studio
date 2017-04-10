const updateStore = (state, action) => {
  return {
    ...state,
    ...action.payload
  }
}

export default updateStore
