import { findNode, removeNode, insertNodeIn } from '../utils/node'

const moveInside = (state, action) => {
  const id = action.payload.id
  const parentId = action.payload.parentId

  const trial = findNode(state.structure, id)
  const result = {}
  removeNode(state.structure, state.entities, id, result)
  const newStructure = insertNodeIn(result.arr, parentId, trial)

  return {
    ...state,
    structure: newStructure
  }
}

export default moveInside
