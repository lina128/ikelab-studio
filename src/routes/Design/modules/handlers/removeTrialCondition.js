const removeTrialCondition = (state, action) => {
  const newEntity = { ...state.entity }
  delete newEntity[action.payload.id].condition[action.payload.cid]

  return {
    ...state,
    entity: newEntity,
    didChange: true
  }
}

export default removeTrialCondition
