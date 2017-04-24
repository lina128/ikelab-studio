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
  let newCounter = state.counter + 1
  return {
    ...state,
    counter: newCounter,
    structure: [
      ...state.structure,
      {
        id: newCounter,
        level: 'run',
        children: []
      }
    ],
    entity: {
      ...state.entity,
      [newCounter] : {
        type: 'RUN',
        name: 'Run' + newCounter,
        setting: getSetting('RUN')
      }
    }
  }
}

export default addRun
