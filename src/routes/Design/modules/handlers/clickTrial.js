const clickTrial = (state, action) => {
  return {
    ...state,
    currentTrial: action.payload.id
  }
}

export default clickTrial
