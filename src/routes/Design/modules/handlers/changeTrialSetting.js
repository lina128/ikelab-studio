import { findNode, extend } from '../utils/node'

const changeTrialSetting = (state, action) => {
  const node = findNode(state.entities, action.payload.id)
  const newSetting = { ...node.setting, ...action.payload.setting }
  const newEntities = extend(state.entities, action.payload.id, { trialSetting: newSetting })

  return {
    ...state,
    entities: newEntities
  }
}

export default changeTrialSetting
