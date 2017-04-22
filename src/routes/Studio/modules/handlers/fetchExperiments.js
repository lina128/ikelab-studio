const fetchExperiments = (state, action) => {
  return {
    ...state,
    isFetching: true
  }
}

export default fetchExperiments
