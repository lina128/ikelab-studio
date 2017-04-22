import * as handle from './handlers'

// ------------------------------------
// Constants
// ------------------------------------
export const STUDIO_ADD_MESSAGE = 'STUDIO_ADD_MESSAGE'
export const STUDIO_DELETE_MESSAGE = 'STUDIO_DELETE_MESSAGE'
export const CREATE_EXPERIMENT = 'CREATE_EXPERIMENT'
export const CREATE_EXPERIMENT_SUCCEEDED = 'CREATE_EXPERIMENT_SUCCEEDED'
export const CREATE_EXPERIMENT_FAILED = 'CREATE_EXPERIMENT_FAILED'
export const FETCH_EXPERIMENTS = 'FETCH_EXPERIMENTS'
export const FETCH_EXPERIMENTS_SUCCEEDED = 'FETCH_EXPERIMENTS_SUCCEEDED'
export const FETCH_EXPERIMENTS_FAILED = 'FETCH_EXPERIMENTS_FAILED'

// ------------------------------------
// Actions
// ------------------------------------
export const addMessage = (id, msg) => {
  return {
    type: STUDIO_ADD_MESSAGE,
    payload: {
      id: id,
      html: msg
    }
  }
}

export const deleteMessage = (id) => {
  return {
    type: STUDIO_DELETE_MESSAGE,
    payload: { id }
  }
}

export const createExperiment = () => {
  return {
    type: CREATE_EXPERIMENT
  }
}

export const fetchExperiments = () => {
  return {
    type: FETCH_EXPERIMENTS
  }
}

export const actions = {
  addMessage,
  deleteMessage,
  createExperiment,
  fetchExperiments
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [STUDIO_ADD_MESSAGE] : handle.addMessage,
  [STUDIO_DELETE_MESSAGE] : handle.deleteMessage,
  [CREATE_EXPERIMENT]: handle.createExperiment,
  [CREATE_EXPERIMENT_SUCCEEDED]: handle.createExperimentSucceeded,
  [CREATE_EXPERIMENT_FAILED]: handle.createExperimentFailed,
  [FETCH_EXPERIMENTS]: handle.fetchExperiments,
  [FETCH_EXPERIMENTS_SUCCEEDED]: handle.fetchExperimentsSucceeded,
  [FETCH_EXPERIMENTS_FAILED]: handle.fetchExperimentsFailed
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  messages: [],
  isFetching: false,
  experiments: []
}

export default function studioReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
