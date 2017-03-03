import { findNode, removeNode } from '../utils/node'

const deleteNode = (state, action) => {
  const newStructure = removeNode(state.structure, action.payload.id)
  const node = findNode(newStructure, state.currentTrial)
  const currentTrial = node ? node.id : null

  return {
    ...state,
    currentTrial: currentTrial,
    structure: newStructure
  }
}

export default deleteNode
