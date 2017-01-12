import * as handle from './handlers'

// ------------------------------------
// Constants
// ------------------------------------
export const TEXT = 'TEXT'
export const DEFAULT = 'DEFAULT'

// ------------------------------------
// Trial Handlers
// ------------------------------------
const TRIAL_HANDLERS = {
	[DEFAULT] : handle.defaultModule
}

export default function render (trial = {}) {
	const handler = TRIAL_HANDLERS[trial.type] || TRIAL_HANDLERS[DEFAULT]
	
	return handler(trial)
}