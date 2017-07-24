const clickTrial = (state, action) => {
  if (state.isTakingScreenshot) {
    return state
  } else {
    return {
      ...state,
      currentTrial: action.payload.id
    }
  }
}

export default clickTrial
