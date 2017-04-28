import { COLOR_PALETTE } from '../../constants'

const addCondition = (state, action) => {
  if (Object.keys(state.condition).length === COLOR_PALETTE.length) {
    return state
  }

  for (let i = 0; i < COLOR_PALETTE.length; i++) {
    if (!state.condition[i]) {
      return {
        ...state,
        condition: {
          ...state.condition,
          [i]: {
            name: 'NewCondition',
            color: COLOR_PALETTE[i]
          }
        }
      }
    }
  }
}

export default addCondition
