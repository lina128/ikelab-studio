const fetchExperimentSucceeded = (state, action) => {
  return {
    ...state,
    ...action.payload
  }
}

export default fetchExperimentSucceeded
