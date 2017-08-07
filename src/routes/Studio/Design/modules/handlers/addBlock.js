import * as handler from '../../elements/settings'

function getSetting (type) {
  let setting = {}
  let settingDefault = handler[type]
  for (let s in settingDefault) {
    setting[s] = settingDefault[s].value
  }

  return setting
}

const addBlock = (state, action) => {
  let newCounter = state.experiment.counter + 1
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
          level: 'block',
          children: []
        }
      ],
      entity: {
        ...state.experiment.entity,
        [newCounter] : {
          type: 'BLOCK',
          name: 'BLOCK' + newCounter,
          setting: getSetting('BLOCK')
        }
      }
    }
  }
}

export default addBlock
