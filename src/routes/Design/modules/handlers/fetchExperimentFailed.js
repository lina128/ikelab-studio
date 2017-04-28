const fetchExperimentFailed = (state, action) => {
  return {
    ...state,
    experimentId: 0,
    isFetching: false
  }
}

export default fetchExperimentFailed
