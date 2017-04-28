const fetchExperimentsFailed = (state, action) => {
  return {
    ...state,
    isFetching: false
  }
}

export default fetchExperimentsFailed
