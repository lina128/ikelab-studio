import { findNode, removeNode } from '../utils/node'

const deleteNode = (state, action) => {
  const result = {}
  removeNode(state.structure, state.entity, action.payload.id, result)

  const node = findNode(result.arr, state.currentTrial)
  const currentTrial = node ? node.id : null

  return {
    ...state,
    currentTrial: currentTrial,
    structure: result.arr,
    entity: result.s
  }
}

export default deleteNode
