import { insertNodeAfter, findNode, copyNode } from '../utils/node'

const copyCurrentTrial = (state, action) => {
  if (!state.experiment.currentTrial) return state

  const nodeId = state.experiment.currentTrial
  const node = findNode(state.experiment.structure, nodeId)
  const newNode = copyNode(node, state.experiment.entity, state.experiment.counter)

  return {
    ...state,
    experiment: {
      ...state.experiment,
      currentTrial: null,
      counter: newNode.counter,
      structure: insertNodeAfter(
        state.experiment.structure,
        nodeId,
        newNode.node),
      entity: newNode.entity
    }
  }
}

export default copyCurrentTrial
