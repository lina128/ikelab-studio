import { remove } from '../utils/node'

const removeTrialCondition = (state, action) => {
  const newStructure = remove(state.structure, action.payload.id, { condition: [ action.payload.condition ] })

  return {
    ...state,
    structure: newStructure
  }
}

export default removeTrialCondition
