import * as handle from './handlers'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TRIAL = 'ADD_TRIAL'
export const ADD_BLOCK = 'ADD_BLOCK'
export const ADD_BLOCK_TRIALS = 'ADD_BLOCK_TRIALS'
export const ADD_RUN = 'ADD_RUN'
export const ADD_CONDITION = 'ADD_CONDITION'
export const ADD_WIZARD = 'ADD_WIZARD'
export const CHANGE_BLOCK_SETTING = 'CHANGE_BLOCK_SETTING'
export const CHANGE_RUN_SETTING = 'CHANGE_RUN_SETTING'
export const CHANGE_TRIAL_SETTING = 'CHANGE_TRIAL_SETTING'
export const CLICK_TRIAL = 'CLICK_TRIAL'
export const COPY_CURRENT_TRIAL = 'COPY_CURRENT_TRIAL'
export const DELETE_CURRENT_TRIAL = 'DELETE_CURRENT_TRIAL'
export const DELETE_NODE = 'DELETE_NODE'
export const MOVE_INSIDE = 'MOVE_INSIDE'
export const MOVE_NODE = 'MOVE_NODE'
export const MOVE_OUTSIDE = 'MOVE_OUTSIDE'
export const REMOVE_CONDITION = 'REMOVE_CONDITION'
export const REMOVE_TRIAL_CONDITION = 'DELETE_TRIAL_CONDITION'
export const RENAME_CONDITION = 'RENAME_CONDITION'
export const SELECT_TRIAL = 'SELECT_TRIAL'
export const TOGGLE_SELECT_MODE = 'TOGGLE_SELECT_MODE'
export const UPDATE_STRUCTURE = 'UPDATE_STRUCTURE'

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

export const addWizard = (type, name, setting) => {
  return {
    type: ADD_WIZARD,
    payload: { type, name, setting }
  }
}

export const changeBlockSetting = (id, setting) => {
  return {
    type: CHANGE_BLOCK_SETTING,
    payload: { id, setting }
  }
}

export const changeRunSetting = (id, setting) => {
  return {
    type: CHANGE_RUN_SETTING,
    payload: { id, setting }
  }
}

export const changeTrialSetting = (id, setting) => {
  return {
    type: CHANGE_TRIAL_SETTING,
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

export const deleteNode = (id) => {
  return {
    type: DELETE_NODE,
    payload: { id }
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

export const removeCondition = (color) => {
  return {
    type: REMOVE_CONDITION,
    payload: { color }
  }
}

export const removeTrialCondition = (id, condition) => {
  return {
    type: REMOVE_TRIAL_CONDITION,
    payload: { id, condition }
  }
}

export const renameCondition = (color, value) => {
  return {
    type: RENAME_CONDITION,
    payload: { color, value }
  }
}

export const selectTrial = (id) => {
  return {
    type: SELECT_TRIAL,
    payload: { id }
  }
}

export const toggleSelectMode = (id, setting, op) => {
  return {
    type: TOGGLE_SELECT_MODE,
    payload: { id, setting, op }
  }
}

export const updateStructure = (id, change) => {
  return {
    type: UPDATE_STRUCTURE,
    payload: { id, change }
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

/*
export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}
*/

export const actions = {
  addTrial,
  addBlock,
  addBlockTrials,
  addRun,
  addCondition,
  addWizard,
  clickTrial,
  changeBlockSetting,
  changeRunSetting,
  changeTrialSetting,
  copyCurrentTrial,
  deleteCurrentTrial,
  deleteNode,
  moveInside,
  moveNode,
  moveOutside,
  removeCondition,
  removeTrialCondition,
  renameCondition,
  selectTrial,
  toggleSelectMode,
  updateStructure
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
  [ADD_WIZARD] : handle.addWizard,
  [CHANGE_BLOCK_SETTING]: handle.changeBlockSetting,
  [CHANGE_RUN_SETTING]: handle.changeRunSetting,
  [CHANGE_TRIAL_SETTING] : handle.changeTrialSetting,
  [CLICK_TRIAL] : handle.clickTrial,
  [COPY_CURRENT_TRIAL] : handle.copyCurrentTrial,
  [DELETE_CURRENT_TRIAL] : handle.deleteCurrentTrial,
  [DELETE_NODE]: handle.deleteNode,
  [MOVE_INSIDE] : handle.moveInside,
  [MOVE_NODE] : handle.moveNode,
  [MOVE_OUTSIDE] : handle.moveOutside,
  [REMOVE_CONDITION] : handle.removeCondition,
  [REMOVE_TRIAL_CONDITION] : handle.removeTrialCondition,
  [RENAME_CONDITION] : handle.renameCondition,
  [SELECT_TRIAL] : handle.selectTrial,
  [TOGGLE_SELECT_MODE] : handle.toggleSelectMode,
  [UPDATE_STRUCTURE] : handle.updateStructure
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  counter: 0,
  condition: [],
  currentTrial: null,
  structure: [],
  entities: [],
  selected: [],
  selectId: null,
  selectMode: false,
  wizards: [],
  tags: []
}
export default function designReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
