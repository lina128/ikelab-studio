const addWizard = (state, action) => {
  return {
    ...state,
    wizard: [ ...state.wizard, action.payload ]
  }
}

export default addWizard
