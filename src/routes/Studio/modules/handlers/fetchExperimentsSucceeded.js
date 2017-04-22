const fetchExperimentsSucceeded = (state, action) => {
  return {
    ...state,
    isFetching: false,
    ...action.payload
  }
}

export default fetchExperimentsSucceeded
