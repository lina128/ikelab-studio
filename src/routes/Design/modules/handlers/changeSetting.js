const changeSetting = (state, action) => {
  const node = state.entity[action.payload.id]
  const newSetting = { ...node.setting, ...action.payload.setting }

  return {
    ...state,
    isTakingScreenshot: true,
    entity: {
      ...state.entity,
      [action.payload.id]: {
        ...node,
        setting: newSetting
      }
    }
  }
}

export default changeSetting
