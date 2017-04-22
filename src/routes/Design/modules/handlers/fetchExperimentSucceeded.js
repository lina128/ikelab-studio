const fetchExperimentSucceeded = (state, action) => {
  return {
    ...state,
    currentTrial: null,
    messages: [],
    isFetching: false,
    isSaving: false,
    isTakingScreenshot: false,
    ...action.payload.experiment
  }
}

export default fetchExperimentSucceeded
