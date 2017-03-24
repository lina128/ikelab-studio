import { removeNode } from '../utils/node'

const deleteCurrentTrial = (state, action) => {
  const result = {}
  removeNode(state.structure, state.entities, state.currentTrial, result)

  return {
    ...state,
    currentTrial: null,
    structure: result.arr,
    entities: result.s
  }
}

export default deleteCurrentTrial
