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
  let newCounter = state.counter + 1
  return {
    ...state,
    counter: newCounter,
    structure: [
      ...state.structure,
      {
        id: newCounter,
        level: 'block',
        children: []
      }
    ],
    entity: {
      ...state.entity,
      [newCounter] : {
        type: 'BLOCK',
        name: 'Block' + newCounter,
        setting: getSetting('BLOCK')
      }
    }
  }
}

export default addBlock
