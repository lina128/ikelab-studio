import uniqueId from 'lodash/uniqueId'

const fetchExperimentsFailed = (state, action) => {
  return {
    ...state,
    isFetching: false,
    messages: [
      ...state.messages,
      {
        id: uniqueId(),
        html: 'Error fetching experiments.'
      }
    ]
  }
}

export default fetchExperimentsFailed
