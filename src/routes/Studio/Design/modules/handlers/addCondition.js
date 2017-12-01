const addCondition = (state, action) => {
  let newCounter = state.experiment.counter + 1

  return {
    ...state,
    experiment: {
      ...state.experiment,
      counter: newCounter,
      condition: {
        ...state.experiment.condition,
        [newCounter]: {
          name: 'NewCondition'
        }
      }
    }
  }
}

export default addCondition
