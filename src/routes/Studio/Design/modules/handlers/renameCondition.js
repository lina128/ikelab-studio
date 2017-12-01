import { extendSet } from '../utils/node'

const renameCondition = (state, action) => {
  const newCondition = extendSet(state.experiment.condition, action.payload.id, { name: action.payload.value })
  return {
    ...state,
    experiment: {
      ...state.experiment,
      condition: newCondition
    }
  }
}

export default renameCondition
