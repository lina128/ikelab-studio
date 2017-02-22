import { findNode, removeNode, insertNodeBefore, insertNodeAfter } from '../utils/node'

const moveNode = (state, action) => {
  const id = action.payload.id
  const afterId = action.payload.afterId
  const direction = action.payload.direction

  if (!direction) return state

  const trial = findNode(state.structure, id)

  const newState1 = removeNode(state.structure, id)

  if (direction === 'UP') {
    const newState2 = insertNodeBefore(newState1, afterId, trial)
    return {
      ...state,
      structure: newState2
    }
  } else {
    // direction is DOWN
    const newState2 = insertNodeAfter(newState1, afterId, trial)
    return {
      ...state,
      structure: newState2
    }
  }
}

export default moveNode
