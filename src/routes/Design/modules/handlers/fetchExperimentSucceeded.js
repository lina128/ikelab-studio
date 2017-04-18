const fetchExperimentSucceeded = (state, action) => {
  return {
    ...state,
    currentTrial: null,
    selected: [],
    selectId: null,
    selectMode: false,
    messages: [],
    isFetching: false,
    isSaving: false,
    ...action.payload
  }
}

export default fetchExperimentSucceeded
