import { findNode, extend } from '../utils/node'

const toggleBlockRandomization = (state, action) => {
  const node = findNode(state.structure, action.payload.id)
  const newSetting = { ...node.setting, randomized: !node.setting.randomized }
  const newStructure = extend(state.structure, action.payload.id, { setting: newSetting })

  return {
    ...state,
    structure: newStructure
  }
}

export default toggleBlockRandomization
