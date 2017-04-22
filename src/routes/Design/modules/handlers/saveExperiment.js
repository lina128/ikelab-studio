const saveExperiment = (state, action) => {
  return {
    ...state,
    isSaving: true
  }
}

export default saveExperiment
