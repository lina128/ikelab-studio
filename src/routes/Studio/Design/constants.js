export const ITEMTYPES = {
  TRIAL: 'trial',
  BLOCK: 'block',
  RUN: 'run',
  REDBOX: 'redbox'
}

export const DIMENSIONS = {
  TRIALHEIGHT: 78,
  TRIALWIDTH: 104
}

export const COLOR_PALETTE = [
  '#3498db',
  '#e74c3c',
  '#1abc9c',
  '#f39c12',
  '#446cb3',
  '#e08283',
  '#674172',
  '#1e824c'
]

export const MENU_CONTENT = [
  {
    name: 'Basic Module',
    children: [
      {
        name: 'Text',
        type: 'TEXT',
        onClick: 'addTrial'
      },
      {
        name: 'Image',
        type: 'IMAGE',
        onClick: 'addTrial'
      },
      {
        name: 'Block',
        type: 'BLOCK',
        onClick: 'addBlock'
      },
      {
        name: 'Run',
        type: 'RUN',
        onClick: 'addRun'
      }
    ]
  },
  {
    name: 'Special Module',
    children: [
      {
        name: 'Change Detection',
        type: 'CHANGE_DETECTION',
        onClick: 'addTrial'
      },
      {
        name: 'Visual Search',
        type: 'VISUAL_SEARCH',
        onClick: 'addTrial'
      },
      {
        name: 'Multiple Object Tracking',
        type: 'MOT',
        onClick: 'addTrial'
      }
    ]
  },
  {
    name: 'Complex Module (Multiple Frames)',
    children: [
      {
        name: 'Image Block',
        type: 'IMAGE_BLOCK',
        onClick: 'openWizard'
      }
    ]
  }
]

export const PLUGINS = ['ikelab_experiment_engine', 'ikelab_images']
