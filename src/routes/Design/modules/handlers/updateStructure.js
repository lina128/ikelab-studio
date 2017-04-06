import { extend } from '../utils/node'

const updateChange = (state, action) => {
  const newStructure = extend(state.structure, action.payload.id, action.payload.change)

  return {
    ...state,
    structure: newStructure,
    didChange: true
  }
}

export default updateChange
