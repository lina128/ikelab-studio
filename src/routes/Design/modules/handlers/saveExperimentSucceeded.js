const saveExperimentSucceeded = (state, action) => {
  return {
    ...state,
    isSaving: false
  }
}

export default saveExperimentSucceeded
