const toggleTrialCondition = (state, action) => {
  let id = state.experiment.currentTrial
  if (!id ||
      state.experiment.entity[id].type === 'BLOCK' ||
      state.experiment.entity[id].type === 'RUN') {
    return state
  }

  let key = action.payload.key
  let ind = state.experiment.entity[id].condition.indexOf(key)
  if (ind > -1) {
    let newCondition = [
      ...state.experiment.entity[id].condition.slice(0, ind),
      ...state.experiment.entity[id].condition.slice(ind + 1)
    ]
    return {
      ...state,
      experiment: {
        ...state.experiment,
        entity: {
          ...state.experiment.entity,
          [id]: {
            ...state.experiment.entity[id],
            condition: newCondition
          }
        }
      }
    }
  } else {
    return {
      ...state,
      experiment: {
        ...state.experiment,
        entity: {
          ...state.experiment.entity,
          [id]: {
            ...state.experiment.entity[id],
            condition: [
              ...state.experiment.entity[id].condition,
              key
            ]
          }
        }
      }
    }
  }
}

export default toggleTrialCondition
