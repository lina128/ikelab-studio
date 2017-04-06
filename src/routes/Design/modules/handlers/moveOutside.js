import { findNode, findNodeParent, removeNode, insertNodeBefore } from '../utils/node'

const moveOutside = (state, action) => {
  const id = action.payload.id

  const trial = findNode(state.structure, id)

  const parent = findNodeParent(state.structure, id)

  if (parent && parent.id !== id) {
    const result = {}
    removeNode(state.structure, state.entity, id, result)

    const newStructure = insertNodeBefore(result.arr, parent.id, trial)

    return {
      ...state,
      structure: newStructure,
      didChange: true
    }
  } else {
    return state
  }
}

export default moveOutside
