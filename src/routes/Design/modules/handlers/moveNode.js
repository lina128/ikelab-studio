import { findNode, removeNode, insertNodeBefore, insertNodeAfter } from '../utils/node'

const moveNode = (state, action) => {
  const id = action.payload.id
  const afterId = action.payload.afterId
  const direction = action.payload.direction

  if (!direction) return state

  const trial = findNode(state.structure, id)

  const result = {}
  removeNode(state.structure, state.entities, id, result)

  let newStructure = []
  if (direction === 'UP') {
    newStructure = insertNodeBefore(result.arr, afterId, trial)
    return {
      ...state,
      structure: newStructure
    }
  } else {
    // direction is DOWN
    newStructure = insertNodeAfter(result.arr, afterId, trial)
    return {
      ...state,
      structure: newStructure
    }
  }
}

export default moveNode
