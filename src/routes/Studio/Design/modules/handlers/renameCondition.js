import { extendSet } from '../utils/node'

const renameCondition = (state, action) => {
  const newCondition = extendSet(state.condition, action.payload.id, { name: action.payload.value })
  return {
    ...state,
    condition: newCondition
  }
}

export default renameCondition
