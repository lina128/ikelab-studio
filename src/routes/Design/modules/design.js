import * as handle from './handlers'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TRIAL = 'ADD_TRIAL'
export const ADD_BLOCK = 'ADD_BLOCK'
export const ADD_RUN = 'ADD_RUN'
export const ADD_CONDITION = 'ADD_CONDITION'
export const CHANGE_SETTING = 'CHANGE_SETTING'
export const CLICK_TRIAL = 'CLICK_TRIAL'
export const MOVE_INSIDE = 'MOVE_INSIDE'
export const MOVE_NODE = 'MOVE_NODE'
export const MOVE_OUTSIDE = 'MOVE_OUTSIDE'
export const RENAME_CONDITION = 'RENAME_CONDITION'
export const SELECT_TRIAL = 'SELECT_TRIAL'
export const TOGGLE_SELECT_MODE = 'TOGGLE_SELECT_MODE'
export const UPDATE_STRUCTURE = 'UPDATE_STRUCTURE'

// ------------------------------------
// Actions
// ------------------------------------
export const addTrial = () => {
	return {
		type: ADD_TRIAL
	}
}

export const addBlock = () => {
	return {
		type: ADD_BLOCK
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

export const renameCondition = (id, value) => {
	return {
		type: RENAME_CONDITION,
		payload: { id, value }
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
	addRun,
	addCondition,
	clickTrial,
	changeSetting,
	moveInside,
	moveNode,
	moveOutside,
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
	[ADD_RUN] : handle.addRun,
	[ADD_CONDITION] : handle.addCondition,
	[CHANGE_SETTING] : handle.changeSetting,
	[CLICK_TRIAL] : handle.clickTrial,
	[MOVE_INSIDE] : handle.moveInside,
	[MOVE_NODE] : handle.moveNode,
	[MOVE_OUTSIDE] : handle.moveOutside,
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
	message: '',
	selected: [],
	selectId: null,
	selectMode: false
}
export default function designReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
