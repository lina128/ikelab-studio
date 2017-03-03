export const ITEMTYPES = {
  TRIAL: 'trial',
  BLOCK: 'block'
}

export const DIMENSIONS = {
  TRIALHEIGHT: 45,
  TRIALWIDTH: 60
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
        name: 'MOT',
        type: 'MOT',
        onClick: 'addTrial'
      },
      {
        name: 'Visual Search',
        type: 'VISUAL_SEARCH',
        onClick: 'addTrial'
      }
    ]
  },
  {
    name: 'Complex Module (Multiple Frames & Blocks)',
    children: [
      {
        name: 'IAT',
        type: 'IAT',
        onClick: 'addTrial'
      },
      {
        name: 'Memory',
        type: 'MEMORY',
        onClick: 'addTrial'
      }
    ]
  }
]
