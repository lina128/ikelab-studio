import { removeNode } from '../utils/node'

const deleteCurrentTrial = (state, action) => {
  const newStructure = removeNode(state.structure, state.currentTrial)
  const newEntity = removeNode(state.entities, state.currentTrial)

  return {
    ...state,
    currentTrial: null,
    structure: newStructure,
    entities: newEntity
  }
}

export default deleteCurrentTrial
