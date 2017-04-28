import * as handle from './handlers'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TRIAL = 'ADD_TRIAL'
export const ADD_BLOCK = 'ADD_BLOCK'
export const ADD_BLOCK_TRIALS = 'ADD_BLOCK_TRIALS'
export const ADD_RUN = 'ADD_RUN'
export const ADD_CONDITION = 'ADD_CONDITION'
export const CHANGE_STRUCTURE = 'CHANGE_STRUCTURE'
export const CHANGE_SETTING = 'CHANGE_SETTING'
export const CHANGE_SETTING_SUCCEEDED = 'CHANGE_SETTING_SUCCEEDED'
export const CHANGE_SETTING_FAILED = 'CHANGE_SETTING_FAILED'
export const CLICK_TRIAL = 'CLICK_TRIAL'
export const COPY_CURRENT_TRIAL = 'COPY_CURRENT_TRIAL'
export const DELETE_CURRENT_TRIAL = 'DELETE_CURRENT_TRIAL'
export const DELETE_NODE = 'DELETE_NODE'
export const FETCH_EXPERIMENT = 'FETCH_EXPERIMENT'
export const FETCH_EXPERIMENT_SUCCEEDED = 'FETCH_EXPERIMENT_SUCCEEDED'
export const FETCH_EXPERIMENT_FAILED = 'FETCH_EXPERIMENT_FAILED'
export const SAVE_EXPERIMENT = 'SAVE_EXPERIMENT'
export const SAVE_EXPERIMENT_SUCCEEDED = 'SAVE_EXPERIMENT_SUCCEEDED'
export const SAVE_EXPERIMENT_FAILED = 'SAVE_EXPERIMENT_FAILED'
export const MOVE_INSIDE = 'MOVE_INSIDE'
export const MOVE_NODE = 'MOVE_NODE'
export const MOVE_OUTSIDE = 'MOVE_OUTSIDE'
export const REMOVE_CONDITION = 'REMOVE_CONDITION'
export const REMOVE_TRIAL_CONDITION = 'DELETE_TRIAL_CONDITION'
export const RENAME_CONDITION = 'RENAME_CONDITION'

// ------------------------------------
// Actions
// ------------------------------------
export const addTrial = (type, name) => {
  return {
    type: ADD_TRIAL,
    payload: { type, name }
  }
}

export const addBlock = () => {
  return {
    type: ADD_BLOCK
  }
}

export const addBlockTrials = (block, trials) => {
  return {
    type: ADD_BLOCK_TRIALS,
    payload: { block, trials }
  }
}

export const addRun = () => {
  return {
    type: ADD_RUN
  }
}

export const addCondition = () => {
  return {
    type: ADD_CONDITION
  }
}

export const changeSetting = (id, setting) => {
  return {
    type: CHANGE_SETTING,
    payload: { id, setting }
  }
}

export const clickTrial = (id) => {
  return {
    type: CLICK_TRIAL,
    payload: { id }
  }
}

export const changeStructure = () => {
  return {
    type: CHANGE_STRUCTURE
  }
}

export const copyCurrentTrial = () => {
  return {
    type: COPY_CURRENT_TRIAL
  }
}

export const deleteCurrentTrial = () => {
  return {
    type: DELETE_CURRENT_TRIAL
  }
}

export const deleteNode = (id) => {
  return {
    type: DELETE_NODE,
    payload: { id }
  }
}

export const fetchExperiment = (id) => {
  return {
    type: FETCH_EXPERIMENT,
    payload: { id }
  }
}

export const saveExperiment = (experiment) => {
  return {
    type: SAVE_EXPERIMENT,
    payload: { ...experiment }
  }
}

export const moveInside = (id, parentId) => {
  return {
    type: MOVE_INSIDE,
    payload: { id, parentId }
  }
}

export const moveNode = (id, afterId, direction) => {
  return {
    type: MOVE_NODE,
    payload: { id, afterId, direction }
  }
}

export const moveOutside = (id) => {
  return {
    type: MOVE_OUTSIDE,
    payload: { id }
  }
}

export const removeCondition = (id) => {
  return {
    type: REMOVE_CONDITION,
    payload: { id }
  }
}

export const removeTrialCondition = (id, cid) => {
  return {
    type: REMOVE_TRIAL_CONDITION,
    payload: { id, cid }
  }
}

export const renameCondition = (id, value) => {
  return {
    type: RENAME_CONDITION,
    payload: { id, value }
  }
}

export const actions = {
  addTrial,
  addBlock,
  addBlockTrials,
  addRun,
  addCondition,
  changeStructure,
  clickTrial,
  changeSetting,
  copyCurrentTrial,
  deleteCurrentTrial,
  deleteNode,
  fetchExperiment,
  moveInside,
  moveNode,
  moveOutside,
  removeCondition,
  removeTrialCondition,
  renameCondition,
  saveExperiment
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_TRIAL] : handle.addTrial,
  [ADD_BLOCK] : handle.addBlock,
  [ADD_BLOCK_TRIALS] : handle.addBlockTrials,
  [ADD_RUN] : handle.addRun,
  [ADD_CONDITION] : handle.addCondition,
  [CHANGE_SETTING] : handle.changeSetting,
  [CHANGE_SETTING_SUCCEEDED]: handle.changeSettingSucceeded,
  [CHANGE_SETTING_FAILED]: handle.changeSettingFailed,
  [CLICK_TRIAL] : handle.clickTrial,
  [COPY_CURRENT_TRIAL] : handle.copyCurrentTrial,
  [DELETE_CURRENT_TRIAL] : handle.deleteCurrentTrial,
  [DELETE_NODE]: handle.deleteNode,
  [FETCH_EXPERIMENT]: handle.fetchExperiment,
  [FETCH_EXPERIMENT_SUCCEEDED]: handle.fetchExperimentSucceeded,
  [FETCH_EXPERIMENT_FAILED]: handle.fetchExperimentFailed,
  [MOVE_INSIDE] : handle.moveInside,
  [MOVE_NODE] : handle.moveNode,
  [MOVE_OUTSIDE] : handle.moveOutside,
  [REMOVE_CONDITION] : handle.removeCondition,
  [REMOVE_TRIAL_CONDITION] : handle.removeTrialCondition,
  [RENAME_CONDITION] : handle.renameCondition,
  [SAVE_EXPERIMENT]: handle.saveExperiment,
  [SAVE_EXPERIMENT_SUCCEEDED]: handle.saveExperimentSucceeded,
  [SAVE_EXPERIMENT_FAILED]: handle.saveExperimentFailed
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  experimentId: 0,
  counter: 0,
  name: 'Unnamed Experiment',
  condition: {},
  currentTrial: null,
  currentControl: null,
  structure: [],
  entity: {},
  isFetching: false,
  isSaving: false,
  isTakingScreenshot: false
}

export default function designReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
