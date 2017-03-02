import { COLOR_PALETTE } from '../../constants'

const addCondition = (state, action) => {
  let color
  let inc = 0
  while (inc < COLOR_PALETTE.length) {
    color = COLOR_PALETTE[inc]

    let idx = -1
    for (let i = 0; i < state.condition.length; i++) {
      if (state.condition[i].color === color) {
        idx = i
        break
      }
    }

    if (idx === -1) {
      break
    } else {
      color = null
      inc++
    }
  }

  if (color) {
    return {
      ...state,
      condition: [
        ...state.condition,
        {
          name: 'NewCondition',
          color: color
        }
      ]
    }
  } else {
    return state
  }
}

export default addCondition
