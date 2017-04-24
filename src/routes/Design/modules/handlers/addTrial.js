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
  let newCounter = state.counter + 1

  if (state.currentTrial) {
    return {
      ...state,
      currentTrial: newCounter,
      counter: newCounter,
      structure: insertNodeAfter(
        state.structure,
        state.currentTrial,
        {
          id: newCounter,
          level: 'trial'
        }),
      entity: {
        ...state.entity,
        [newCounter] : {
          type: action.payload.type,
          name: action.payload.name,
          condition: {},
          screenshot: null,
          setting: getSetting(action.payload.type)
        }
      }
    }
  } else {
    return {
      ...state,
      currentTrial: newCounter,
      counter: newCounter,
      structure: [
        ...state.structure,
        {
          id: newCounter,
          level: 'trial'
        }
      ],
      entity: {
        ...state.entity,
        [newCounter] : {
          type: action.payload.type,
          name: action.payload.name,
          condition: {},
          screenshot: null,
          setting: getSetting(action.payload.type)
        }
      }
    }
  }
}

export default addTrial
