import { insertNodeAfter, findNode } from '../utils/node'

const copyCurrentTrial = (state, action) => {
  let newCounterT = state.counter + 1
  const nodeStructure = findNode(state.structure, state.currentTrial)
  const nodeEntity = findNode(state.entities, state.currentTrial)

  return {
    ...state,
    currentTrial: newCounterT,
    counter: newCounterT,
    structure: insertNodeAfter(
      state.structure,
      state.currentTrial,
      {
        ...nodeStructure,
        id: newCounterT
      }),
    entities: [
      ...state.entities,
      {
        ...nodeEntity,
        id: newCounterT
      }
    ]
  }
}

export default copyCurrentTrial
