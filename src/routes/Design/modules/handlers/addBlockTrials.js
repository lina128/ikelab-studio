import * as handler from '../../elements/settings'

function getDefaultSetting (type) {
  let setting = {}
  let settingDefault = handler[type]
  for (let s in settingDefault) {
    setting[s] = settingDefault[s].value
  }

  return setting
}

const defaultBlockSetting = {
  randomized: false,
  repeat: 0,
  lockTop: false,
  lockBottom: false
}

const addBlockTrials = (state, action) => {
  // action has type, payload, payload has block and trials,
  // block has setting, each trial in the array has type and setting

  // add new block
  if (!action.payload.block) {
    console.log('block is expected to be an object.')
    return state
  }
  if (!action.payload.block.setting || typeof action.payload.block.setting !== 'object') {
    console.log('block setting is expected to be an object.')
    return state
  }
  if (!Array.isArray(action.payload.trials)) {
    console.log('trials is expected to be an array.')
    return state
  }

  let newCounter = state.counter + 1
  const newCounterB = newCounter

  let trials = action.payload.trials
  const children = []
  const newEntity = {}
  let newTrialSetting
  for (let i = 0; i < trials.length; i++) {
    newCounter++
    children.push(
      {
        id: newCounter,
        level: 'trial',
        selected: false,
        screenshot: null
      }
    )

    newTrialSetting = { ...getDefaultSetting(trials[i].type), ...trials[i].setting }
    newEntity[newCounter] = {
      type: trials[i].type,
      name: trials[i].name,
      condition: trials[i].condition,
      trialSetting: newTrialSetting
    }
  }

  let newBlockSetting = action.payload.block.setting ? action.payload.block.setting : {}
  return {
    ...state,
    counter: newCounter,
    structure: [
      ...state.structure,
      {
        id: newCounterB,
        level: 'block',
        name: 'Block' + newCounterB,
        blockSetting: { ...defaultBlockSetting, ...newBlockSetting },
        children: children
      }
    ],
    entity: {
      ...state.entity,
      ...newEntity
    },
    didChange: true
  }
}

export default addBlockTrials
