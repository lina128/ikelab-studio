const updateStore = (state, action) => {
  return {
    ...state,
    currentTrial: null,
    selected: [],
    selectId: null,
    selectMode: false,
    messages: [],
    ...action.payload
  }
}

export default updateStore
