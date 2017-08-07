import { findNode, removeNode, insertNodeIn } from '../utils/node'

const moveInside = (state, action) => {
  const id = action.payload.id
  const parentId = action.payload.parentId

  const trial = findNode(state.experiment.structure, id)
  const result = {}
  removeNode(state.experiment.structure, state.experiment.entity, id, result)
  const newStructure = insertNodeIn(result.arr, parentId, trial)

  return {
    ...state,
    experiment: {
      ...state.experiment,
      structure: newStructure
    }
  }
}

export default moveInside
