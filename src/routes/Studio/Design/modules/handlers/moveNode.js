import { findNode, removeNode, insertNodeBefore, insertNodeAfter } from '../utils/node'

const moveNode = (state, action) => {
  const id = action.payload.id
  const afterId = action.payload.afterId
  const direction = action.payload.direction

  if (!direction) return state

  const trial = findNode(state.experiment.structure, id)

  const result = {}
  removeNode(state.experiment.structure, state.experiment.entity, id, result)

  let newStructure = []
  if (direction === 'UP') {
    newStructure = insertNodeBefore(result.arr, afterId, { ...trial })
    return {
      ...state,
      experiment: {
        ...state.experiment,
        structure: newStructure
      }
    }
  } else {
    // direction is DOWN
    newStructure = insertNodeAfter(result.arr, afterId, { ...trial })
    return {
      ...state,
      experiment: {
        ...state.experiment,
        structure: newStructure
      }
    }
  }
}

export default moveNode
