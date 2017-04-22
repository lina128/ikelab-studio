import uniqueId from 'lodash/uniqueId'

const saveExperimentFailed = (state, action) => {
  return {
    ...state,
    isSaving: false,
    messages: [
      ...state.messages,
      {
        id: uniqueId(),
        html: 'Error saving the experiment.'
      }
    ]
  }
}

export default saveExperimentFailed
