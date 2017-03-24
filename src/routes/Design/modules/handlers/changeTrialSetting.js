const changeTrialSetting = (state, action) => {
  const node = state.entities[action.payload.id]
  const newSetting = { ...node.trialSetting, ...action.payload.setting }

  return {
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: {
        ...node,
        trialSetting: newSetting
      }
    }
  }
}

export default changeTrialSetting
