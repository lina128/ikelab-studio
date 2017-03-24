const removeTrialCondition = (state, action) => {
  const newEntities = { ...state.entities }
  delete newEntities[action.payload.id].condition[action.payload.cid]

  return {
    ...state,
    entities: newEntities
  }
}

export default removeTrialCondition
