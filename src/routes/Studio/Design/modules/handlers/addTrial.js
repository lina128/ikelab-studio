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
  let newCounter = state.experiment.counter + 1

  if (state.experiment.currentTrial) {
    return {
      ...state,
      experiment: {
        ...state.experiment,
        currentTrial: newCounter,
        counter: newCounter,
        structure: insertNodeAfter(
          state.experiment.structure,
          state.experiment.currentTrial,
          {
            id: newCounter,
            level: 'trial'
          }),
        entity: {
          ...state.experiment.entity,
          [newCounter] : {
            type: action.payload.type,
            name: action.payload.type + newCounter,
            condition: [],
            screenshot: null,
            setting: getSetting(action.payload.type)
          }
        }
      }
    }
  } else {
    return {
      ...state,
      experiment: {
        ...state.experiment,
        currentTrial: newCounter,
        counter: newCounter,
        structure: [
          ...state.experiment.structure,
          {
            id: newCounter,
            level: 'trial'
          }
        ],
        entity: {
          ...state.experiment.entity,
          [newCounter] : {
            type: action.payload.type,
            name: action.payload.type + newCounter,
            condition: [],
            screenshot: null,
            setting: getSetting(action.payload.type)
          }
        }
      }
    }
  }
}

export default addTrial
