import { removeAll } from '../utils/node'

const removeCondition = (state, action) => {
  for (let i = 0; i < state.condition.length; i++) {
    if (state.condition[i].color === action.payload.color) {
      const newStructure = removeAll(state.structure, { condition: [ action.payload.color ] })

      return {
        ...state,
        structure: newStructure,
        condition: [
          ...state.condition.slice(0, i),
          ...state.condition.slice(i + 1)
        ]
      }
    }
  }

  return state
}

export default removeCondition
