const fetchExperiment = (state, action) => {
  return {
    ...state,
    isFetching: true
  }
}

export default fetchExperiment
