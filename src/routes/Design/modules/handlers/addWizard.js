const addWizard = (state, action) => {
  return {
    ...state,
    wizards: [ ...state.wizards, action.payload ]
  }
}

export default addWizard
