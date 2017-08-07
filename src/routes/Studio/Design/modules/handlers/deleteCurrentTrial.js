import { removeNode } from '../utils/node'

const deleteCurrentTrial = (state, action) => {
  const result = {}

  if (!state.experiment.currentTrial) return state

  removeNode(state.experiment.structure, state.experiment.entity, state.experiment.currentTrial, result)

  return {
    ...state,
    experiment: {
      ...state.experiment,
      currentTrial: null,
      structure: result.arr,
      entity: result.s
    }
  }
}

export default deleteCurrentTrial
