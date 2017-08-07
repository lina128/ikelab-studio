const clickTrial = (state, action) => {
  return {
    ...state,
    experiment: {
      ...state.experiment,
      currentTrial: action.payload.id
    }
  }
}

export default clickTrial
