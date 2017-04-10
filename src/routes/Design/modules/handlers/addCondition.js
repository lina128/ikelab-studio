import { COLOR_PALETTE } from '../../constants'
import addMessage from './addMessage'
import uniqueId from 'lodash/flow'

const addCondition = (state, action) => {
  if (Object.keys(state.condition).length === COLOR_PALETTE.length) {
    return addMessage(state, {
      type: 'ADD_MESSAGE',
      payload: {
        id: uniqueId(),
        html: 'You can add at most ' + COLOR_PALETTE.length + ' conditions.'
      }
    })
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
