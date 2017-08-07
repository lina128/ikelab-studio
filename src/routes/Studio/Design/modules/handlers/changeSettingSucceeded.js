const changeSettingSucceeded = (state, action) => {
  if (action.payload) {
    const node = state.experiment.entity[action.payload.id]

    return {
      ...state,
      experiment: {
        ...state.experiment,
        entity: {
          ...state.experiment.entity,
          [action.payload.id]: {
            ...node,
            screenshot: action.payload.screenshot
          }
        }
      }
    }
  } else {
    return state
  }
}

export default changeSettingSucceeded
