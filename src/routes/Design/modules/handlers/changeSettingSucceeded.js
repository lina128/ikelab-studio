const changeSettingSucceeded = (state, action) => {
  if (action.payload) {
    const node = state.entity[action.payload.id]

    return {
      ...state,
      isTakingScreenshot: false,
      entity: {
        ...state.entity,
        [action.payload.id]: {
          ...node,
          screenshot: action.payload.screenshot
        }
      }
    }
  } else {
    return {
      ...state,
      isTakingScreenshot: false
    }
  }
}

export default changeSettingSucceeded
