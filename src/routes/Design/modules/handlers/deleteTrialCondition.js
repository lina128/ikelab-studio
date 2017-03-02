import { remove } from '../utils/node'

const deleteTrialCondition = (state, action) => {
  const newStructure = remove(state.structure, action.payload.id, action.payload.condition)

  return {
    ...state,
    structure: newStructure
  }
}

export default deleteTrialCondition
