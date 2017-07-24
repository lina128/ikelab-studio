import { removeNode } from '../utils/node'

const deleteCurrentTrial = (state, action) => {
  const result = {}
  removeNode(state.structure, state.entity, state.currentTrial, result)

  return {
    ...state,
    currentTrial: null,
    structure: result.arr,
    entity: result.s
  }
}

export default deleteCurrentTrial
