const removeCondition = (state, action) => {
  const newCondition = { ...state.condition }
  delete newCondition[action.payload.id]

  const newEntities = { ...state.entities }
  for (let id in newEntities) {
    delete newEntities[id].condition[action.payload.id]
  }

  return {
    ...state,
    condition: newCondition,
    entities: newEntities
  }
}

export default removeCondition
