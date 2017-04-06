import { extend } from '../utils/node'

const changeRunSetting = (state, action) => {
  const newStructure = extend(state.structure, action.payload.id, { runSetting: action.payload.setting })

  return {
    ...state,
    structure: newStructure,
    didChange: true
  }
}

export default changeRunSetting
