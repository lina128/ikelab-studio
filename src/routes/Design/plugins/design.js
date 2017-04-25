import * as plugins from './handlers'

export const IKELAB_EXPERIMENT_ENGINE_TRIAL_PREVIEW = 'IKELAB_EXPERIMENT_ENGINE_TRIAL_PREVIEW'

const PLUGIN_HANDLER = {
  [IKELAB_EXPERIMENT_ENGINE_TRIAL_PREVIEW]: plugins.ikelabExperimentEngineTrialPreview
}

export function getPlugin (id) {
  const handler = PLUGIN_HANDLER[id]
  return handler
}
