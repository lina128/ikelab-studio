import uniqueId from 'lodash/uniqueId'

const createExperimentFailed = (state, action) => {
  return {
    ...state,
    messages: [
      ...state.messages,
      {
        id: uniqueId(),
        html: 'Error creating experiment.'
      }
    ]
  }
}

export default createExperimentFailed
