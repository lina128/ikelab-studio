import uniqueId from 'lodash/uniqueId'

const fetchExperimentFailed = (state, action) => {
  return {
    ...state,
    experimentId: 0,
    isFetching: false,
    messages: [
      ...state.messages,
      {
        id: uniqueId(),
        html: 'Error fetching the experiment.'
      }
    ]
  }
}

export default fetchExperimentFailed
