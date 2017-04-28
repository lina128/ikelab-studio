const saveExperimentFailed = (state, action) => {
  return {
    ...state,
    isSaving: false
  }
}

export default saveExperimentFailed
