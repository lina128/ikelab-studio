import * as handler from '../../elements/settings'

function getSetting (type) {
  let setting = {}
  let settingDefault = handler[type]
  for (let s in settingDefault) {
    setting[s] = settingDefault[s].value
  }

  return setting
}

const addRun = (state, action) => {
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
          level: 'run',
          children: []
        }
      ],
      entity: {
        ...state.experiment.entity,
        [newCounter] : {
          type: 'RUN',
          name: 'RUN' + newCounter,
          setting: getSetting('RUN')
        }
      }
    }
  }
}

export default addRun
