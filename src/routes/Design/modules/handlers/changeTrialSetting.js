const changeTrialSetting = (state, action) => {
  const node = state.entity[action.payload.id]
  const newSetting = { ...node.trialSetting, ...action.payload.setting }

  return {
    ...state,
    isTakingScreenshot: true,
    entity: {
      ...state.entity,
      [action.payload.id]: {
        ...node,
        trialSetting: newSetting
      }
    }
  }
}

export default changeTrialSetting
