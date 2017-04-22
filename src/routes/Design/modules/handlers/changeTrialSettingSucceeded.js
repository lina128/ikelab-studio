import { extend } from '../utils/node'

const changeTrialSettingSucceeded = (state, action) => {
  const newStructure = extend(state.structure, action.payload.id, action.payload.change)

  return {
    ...state,
    isTakingScreenshot: false,
    structure: newStructure
  }
}

export default changeTrialSettingSucceeded
