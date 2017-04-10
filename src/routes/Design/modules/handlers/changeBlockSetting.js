import { extend } from '../utils/node'

const changeBlockSetting = (state, action) => {
  const newStructure = extend(state.structure, action.payload.id, { blockSetting: action.payload.setting })

  return {
    ...state,
    structure: newStructure
  }
}

export default changeBlockSetting
