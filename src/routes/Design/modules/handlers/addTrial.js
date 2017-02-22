import { insertNodeAfter } from '../utils/node'
import * as handler from '../../elements/settings'

function getSetting (type) {
  let setting = {}
  let settingDefault = handler[type]
  for (let s in settingDefault) {
    setting[s] = settingDefault[s].value
  }

  return setting
}

const addTrial = (state, action) => {
  let newCounterT = state.counter + 1
  if (state.currentTrial) {
    return {
      ...state,
      currentTrial: newCounterT,
      counter: newCounterT,
      structure: insertNodeAfter(
        state.structure,
        state.currentTrial,
        {
          id: newCounterT,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        }),
      entities: [
        ...state.entities,
        {
          id: newCounterT,
          type: action.payload.type,
          setting: getSetting(action.payload.type)
        }
      ]
    }
  } else {
    return {
      ...state,
      currentTrial: newCounterT,
      counter: newCounterT,
      structure: [
        ...state.structure,
        {
          id: newCounterT,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        }
      ],
      entities: [
        ...state.entities,
        {
          id: newCounterT,
          type: action.payload.type,
          setting: getSetting(action.payload.type)
        }
      ]
    }
  }
}

export default addTrial
