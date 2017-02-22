import { COLORPALETTE } from '../../constants'

const addCondition = (state, action) => {
  let color
  let inc = 0
  while (inc < ColorPalette.length) {
    color = ColorPalette[inc]

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
    let newCounterC = state.counter + 1
    return {
      ...state,
      counter: newCounterC,
      condition: [
        ...state.condition,
        {
          id: newCounterC,
          name: 'Condition' + newCounterC,
          color: color
        }
      ]
    }
  } else {
    return state
  }
}

export default addCondition
