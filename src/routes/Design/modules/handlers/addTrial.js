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
          screenshot: null
        }),
      entity: {
        ...state.entity,
        [newCounterT] : {
          type: action.payload.type,
          name: action.payload.name,
          condition: {},
          trialSetting: getSetting(action.payload.type)
        }
      }
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
          screenshot: null
        }
      ],
      entity: {
        ...state.entity,
        [newCounterT] : {
          type: action.payload.type,
          name: action.payload.name,
          condition: {},
          trialSetting: getSetting(action.payload.type)
        }
      }
    }
  }
}

export default addTrial
