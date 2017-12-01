const deleteCondition = (state, action) => {
  const newCondition = { ...state.experiment.condition }
  delete newCondition[action.payload.id]

  const newEntity = { ...state.experiment.entity }
  for (let id in newEntity) {
    let ind = newEntity[id].condition.indexOf(action.payload.id)
    if (ind > -1) {
      newEntity[id].condition = [
        ...newEntity[id].condition.slice(0, ind),
        ...newEntity[id].condition.slice(ind + 1)
      ]
    }
  }

  return {
    ...state,
    experiment: {
      ...state.experiment,
      condition: newCondition,
      entity: newEntity
    }
  }
}

export default deleteCondition
