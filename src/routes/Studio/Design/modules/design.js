import * as handle from './handlers'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TRIAL = 'ADD_TRIAL'
export const ADD_BLOCK = 'ADD_BLOCK'
export const ADD_BLOCK_TRIALS = 'ADD_BLOCK_TRIALS'
export const ADD_RUN = 'ADD_RUN'
export const ADD_CONDITION = 'ADD_CONDITION'
export const TOGGLE_TRIAL_CONDITION = 'TOGGLE_TRIAL_CONDITION'
export const CHANGE_SETTING = 'CHANGE_SETTING'
export const CHANGE_SETTING_SUCCEEDED = 'CHANGE_SETTING_SUCCEEDED'
export const CLICK_TRIAL = 'CLICK_TRIAL'
export const COPY_CURRENT_TRIAL = 'COPY_CURRENT_TRIAL'
export const DELETE_CURRENT_TRIAL = 'DELETE_CURRENT_TRIAL'
export const DELETE_CONDITION = 'DELETE_CONDITION'
export const DELETE_NODE = 'DELETE_NODE'
export const FETCH_EXPERIMENT = 'FETCH_EXPERIMENT'
export const FETCH_EXPERIMENT_SUCCEEDED = 'FETCH_EXPERIMENT_SUCCEEDED'
export const SAVE_EXPERIMENT = 'SAVE_EXPERIMENT'
export const SAVE_EXPERIMENT_SUCCEEDED = 'SAVE_EXPERIMENT_SUCCEEDED'
export const MOVE_INSIDE = 'MOVE_INSIDE'
export const MOVE_NODE = 'MOVE_NODE'
export const MOVE_OUTSIDE = 'MOVE_OUTSIDE'
export const RENAME_CONDITION = 'RENAME_CONDITION'
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE'

// ------------------------------------
// Actions
// ------------------------------------
export const addTrial = (type) => {
  return {
    type: ADD_TRIAL,
    payload: { type }
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

export const toggleTrialCondition = (key) => {
  return {
    type: TOGGLE_TRIAL_CONDITION,
    payload: { key }
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

export const deleteCondition = (id) => {
  return {
    type: DELETE_CONDITION,
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
    payload: { experiment }
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

export const moveOutside = () => {
  return {
    type: MOVE_OUTSIDE
  }
}

export const renameCondition = (id, value) => {
  return {
    type: RENAME_CONDITION,
    payload: { id, value }
  }
}

export const uploadImage = (id, key, file) => {
  return {
    type: UPLOAD_IMAGE,
    payload: { id, key, file }
  }
}

export const actions = {
  addTrial,
  addBlock,
  addBlockTrials,
  addRun,
  addCondition,
  toggleTrialCondition,
  clickTrial,
  changeSetting,
  copyCurrentTrial,
  deleteCurrentTrial,
  deleteCondition,
  fetchExperiment,
  moveInside,
  moveNode,
  moveOutside,
  renameCondition,
  saveExperiment,
  uploadImage
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
  [TOGGLE_TRIAL_CONDITION]: handle.toggleTrialCondition,
  [CHANGE_SETTING] : handle.changeSetting,
  [CHANGE_SETTING_SUCCEEDED]: handle.changeSettingSucceeded,
  [CLICK_TRIAL] : handle.clickTrial,
  [COPY_CURRENT_TRIAL] : handle.copyCurrentTrial,
  [DELETE_CURRENT_TRIAL] : handle.deleteCurrentTrial,
  [DELETE_CONDITION] : handle.deleteCondition,
  [FETCH_EXPERIMENT_SUCCEEDED]: handle.fetchExperimentSucceeded,
  [MOVE_INSIDE] : handle.moveInside,
  [MOVE_NODE] : handle.moveNode,
  [MOVE_OUTSIDE] : handle.moveOutside,
  [RENAME_CONDITION] : handle.renameCondition,
  [SAVE_EXPERIMENT]: handle.saveExperiment,
  [SAVE_EXPERIMENT_SUCCEEDED]: handle.saveExperimentSucceeded,
  [UPLOAD_IMAGE]: handle.uploadImage
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function designReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
