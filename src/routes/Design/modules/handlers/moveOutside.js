import { findNode, findNodeParent, removeNode, insertNodeBefore } from '../utils/node'

const moveOutside = (state, action) => {
  const id = action.payload.id

  const trial = findNode(state.structure, id)

  const parent = findNodeParent(state.structure, id)

  if (parent && parent.id !== id) {
    const newState1 = removeNode(state.structure, id)
    const newState2 = insertNodeBefore(newState1, parent.id, trial)

    return {
      ...state,
      structure: newState2
    }
  } else {
    return state
  }
}

export default moveOutside
