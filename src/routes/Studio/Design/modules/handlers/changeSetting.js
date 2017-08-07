const changeSetting = (state, action) => {
  const node = state.experiment.entity[action.payload.id]
  const newSetting = { ...node.setting, ...action.payload.setting }

  return {
    ...state,
    experiment: {
      ...state.experiment,
      entity: {
        ...state.experiment.entity,
        [action.payload.id]: {
          ...node,
          setting: newSetting
        }
      }
    }
  }
}

export default changeSetting
