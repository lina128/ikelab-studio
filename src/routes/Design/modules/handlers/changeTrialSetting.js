const changeTrialSetting = (state, action) => {
  const node = state.entity[action.payload.id]
  const newSetting = { ...node.trialSetting, ...action.payload.setting }

  return {
    ...state,
    entity: {
      ...state.entity,
      [action.payload.id]: {
        ...node,
        trialSetting: newSetting
      }
    },
    didChange: true
  }
}

export default changeTrialSetting
