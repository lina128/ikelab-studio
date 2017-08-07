import { findNode, findNodeParent, removeNode, insertNodeBefore } from '../utils/node'

const moveOutside = (state, action) => {
  if (!state.experiment.currentTrial) return state

  const id = state.experiment.currentTrial
  const trial = findNode(state.experiment.structure, id)

  const parent = findNodeParent(state.experiment.structure, id)

  if (parent && parent.id !== id) {
    const result = {}
    removeNode(state.experiment.structure, state.experiment.entity, id, result)

    const newStructure = insertNodeBefore(result.arr, parent.id, { ...trial })

    return {
      ...state,
      experiment: {
        ...state.experiment,
        structure: newStructure
      }
    }
  } else {
    return state
  }
}

export default moveOutside
