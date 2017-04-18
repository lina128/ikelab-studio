import uniqueId from 'lodash/uniqueId'

const fetchExperimentFailed = (state, action) => {
  return {
    ...state,
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
