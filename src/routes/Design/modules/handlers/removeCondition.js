const removeCondition = (state, action) => {
  const newCondition = { ...state.condition }
  delete newCondition[action.payload.id]

  const newEntity = { ...state.entity }
  for (let id in newEntity) {
    delete newEntity[id].condition[action.payload.id]
  }

  return {
    ...state,
    condition: newCondition,
    entity: newEntity
  }
}

export default removeCondition
