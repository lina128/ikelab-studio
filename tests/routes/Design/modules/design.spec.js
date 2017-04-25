import { addBlock, addBlockTrials, addCondition, addRun, addTrial,
addMessage, deleteMessage,
changeSetting, clickTrial, copyCurrentTrial,
deleteCurrentTrial, moveInside, moveNode, moveOutside,
removeCondition, removeTrialCondition, renameCondition,
default as designReducer } from 'routes/Design/modules/design'
import text from 'routes/Design/elements/settings/text'

function getSetting () {
  let setting = {}

  for (let s in text) {
    setting[s] = text[s].value
  }

  return setting
}

describe('(Design/modules)', () => {
  let _initialState

  const setting = getSetting()
  const trialType = 'TEXT'

  beforeEach(() => {
    _initialState = {
      counter: 0,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: null,
      structure: [],
      entity: {},
      messages: []
    }
  })

  describe('reducer', () => {
    it('Should initialize with an initial state.', () => {
      expect(designReducer(undefined, {})).to.deep.equal(_initialState)
    })

    it('Should return the previous state if an action is not matched.', () => {
      const state1 = designReducer(undefined, {})
      expect(state1).to.deep.equal(_initialState)
      const state2 = designReducer(state1, { type: '@@@@@@@' })
      expect(state2).to.deep.equal(_initialState)
    })
  })

  describe('handlers', () => {
    it('Should handle ADD_BLOCK', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addBlock())
      expect(state2).to.deep.equal({
        counter: 1,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: null,
        structure: [
          {
            id: 1,
            level: 'block',
            children: []
          }
        ],
        entity: {},
        messages: []
      })
    })

    it('Should handle ADD_BLOCK_TRIALS', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addBlockTrials({ setting: [] }, [
        {
          type: 'TEXT',
          name: 'Text',
          condition: {},
          setting: setting
        },
        {
          type: 'TEXT',
          name: 'Text',
          condition: {},
          setting: { font: 66 }
        }
      ]))

      expect(state2).to.deep.equal({
        counter: 3,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: null,
        structure: [
          {
            id: 1,
            level: 'block',
            children: [
              {
                id: 2,
                level: 'trial',
                screenshot: null
              },
              {
                id: 3,
                level: 'trial',
                screenshot: null
              }
            ]
          }
        ],
        entity: {
          2: {
            type: 'TEXT',
            name: 'Text',
            condition: {},
            setting: setting
          },
          3: {
            type: 'TEXT',
            name: 'Text',
            condition: {},
            setting: { ...setting, font: 66 }
          }
        },
        messages: []
      })
    })

    it('Should handle ADD_CONDITION', () => {
      const state1 = designReducer(undefined, {})
      expect(state1).to.deep.equal(_initialState)
      const state2 = designReducer(state1, addCondition())
      expect(state2).to.deep.equal({
        counter: 0,
        name: 'Unnamed Experiment',
        condition: {
          0: {
            name: 'NewCondition',
            color: '#3498db'
          }
        },
        currentTrial: null,
        structure: [],
        entity: {},
        messages: []
      })
    })

    it('Should handle ADD_RUN', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addRun())
      expect(state2).to.deep.equal({
        counter: 1,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: null,
        structure: [
          {
            id: 1,
            level: 'run',
            children: []
          }
        ],
        entity: {},
        messages: []
      })
    })

    it('Should handle ADD_MESSAGE', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addMessage('1', 'Loading'))

      expect(state2).to.deep.equal({
        counter: 0,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: null,
        structure: [],
        entity: {},
        messages: [
          {
            id: '1',
            html: 'Loading'
          }
        ]
      })
    })

    it('Should handle DELETE_MESSAGE', () => {
      const state1 = {
        counter: 0,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: null,
        structure: [],
        entity: {},
        messages: [
          {
            id: 1,
            html: 'Loading'
          }
        ]
      }

      const state2 = designReducer(state1, deleteMessage(1))

      expect(state2).to.deep.equal({
        counter: 0,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: null,
        structure: [],
        entity: {},
        messages: []
      })
    })

    it('Should handle ADD_TRIAL', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addTrial(trialType, 'Text'))

      expect(state2).to.deep.equal({
        counter: 1,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        },
        messages: []
      })
    })

    it('Should handle CLICK_TRIAL', () => {
      const state1 = {
        counter: 1,
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          },
          2: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      }

      const state2 = designReducer(state1, clickTrial(2))
      expect(state2).to.deep.equal({
        counter: 1,
        condition: {},
        currentTrial: 2,
        structure: [
          {
            id: 1,
            level: 'trial',
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          },
          2: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      })
    })

    it('Should handle COPY_CURRENT_TRIAL', () => {
      const state1 = {
        counter: 1,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      }

      const state2 = designReducer(state1, copyCurrentTrial())

      expect(state2).to.deep.equal({
        counter: 2,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: 2,
        structure: [
          {
            id: 1,
            level: 'trial',
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          },
          2: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      })
    })

    it('Should handle DELETE_CURRENT_TRIAL', () => {
      const state1 = {
        counter: 1,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      }

      const state2 = designReducer(state1, deleteCurrentTrial())
      expect(state2).to.deep.equal({
        counter: 1,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: null,
        structure: [],
        entity: {}
      })
    })

    it('Should handle MOVE_INSIDE', () => {
      const state1 = {
        counter: 2,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            screenshot: null
          },
          {
            id: 2,
            level: 'block',
            name: 'Block2',
            children: []
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      }

      const state2 = designReducer(state1, moveInside(1, 2))

      expect(state2).to.deep.equal({
        counter: 2,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 2,
            level: 'block',
            name: 'Block2',
            children: [
              {
                id: 1,
                level: 'trial',
                screenshot: null
              }
            ]
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      })

      const state3 = {
        counter: 3,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 2,
            level: 'block',
            name: 'Block2',
            children: [
              {
                id: 1,
                level: 'trial',
                screenshot: null
              }
            ]
          },
          {
            id: 3,
            level: 'run',
            name: 'Run3',
            children: []
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      }

      const state4 = designReducer(state3, moveInside(2, 3))

      expect(state4).to.deep.equal({
        counter: 3,
        name: 'Unnamed Experiment',
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 3,
            level: 'run',
            name: 'Run3',
            children: [
              {
                id: 2,
                level: 'block',
                name: 'Block2',
                children: [
                  {
                    id: 1,
                    level: 'trial',
                    screenshot: null
                  }
                ]
              }
            ]
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            setting: setting
          }
        }
      })
    })
  })

  it('Should handle MOVE_NODE (trial)', () => {
    const state1 = {
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: 2,
      structure: [
        {
          id: 1,
          level: 'trial',
          screenshot: null
        },
        {
          id: 2,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        },
        2: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        }
      },
      messages: []
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: 2,
      structure: [
        {
          id: 2,
          level: 'trial',
          screenshot: null
        },
        {
          id: 1,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        },
        2: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        }
      },
      messages: []
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: 2,
      structure: [
        {
          id: 1,
          level: 'trial',
          screenshot: null
        },
        {
          id: 2,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        },
        2: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        }
      },
      messages: []
    })
  })

  it('Should handle MOVE_NODE (block)', () => {
    const state1 = {
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 1,
          level: 'block',
          name: 'Block1',
          children: []
        },
        {
          id: 2,
          level: 'block',
          name: 'Block2',
          children: []
        }
      ],
      entity: {},
      messages: []
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 2,
          level: 'block',
          name: 'Block2',
          children: []
        },
        {
          id: 1,
          level: 'block',
          name: 'Block1',
          children: []
        }
      ],
      entity: {},
      messages: []
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 1,
          level: 'block',
          name: 'Block1',
          children: []
        },
        {
          id: 2,
          level: 'block',
          name: 'Block2',
          children: []
        }
      ],
      entity: {},
      messages: []
    })
  })

  it('Should handle MOVE_NODE (run)', () => {
    const state1 = {
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 1,
          level: 'run',
          name: 'Run1',
          children: []
        },
        {
          id: 2,
          level: 'run',
          name: 'Run2',
          children: []
        }
      ],
      entity: {},
      messages: []
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 2,
          level: 'run',
          name: 'Run2',
          children: []
        },
        {
          id: 1,
          level: 'run',
          name: 'Run1',
          children: []
        }
      ],
      entity: {},
      messages: []
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 1,
          level: 'run',
          name: 'Run1',
          children: []
        },
        {
          id: 2,
          level: 'run',
          name: 'Run2',
          children: []
        }
      ],
      entity: {},
      messages: []
    })
  })

  it('Should handle MOVE_OUTSIDE', () => {
    const state1 = {
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: 1,
      structure: [
        {
          id: 2,
          level: 'block',
          name: 'Block2',
          children: [
            {
              id: 1,
              level: 'trial',
              screenshot: null
            }
          ]
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        }
      },
      messages: []
    }

    const state2 = designReducer(state1, moveOutside(1))

    expect(state2).to.deep.equal({
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          screenshot: null
        },
        {
          id: 2,
          level: 'block',
          name: 'Block2',
          children: []
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        }
      },
      messages: []
    })
  })

  it('Should handle REMOVE_CONDITION', () => {
    const state1 = {
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {
        0: {
          name: 'Condition1',
          color: '#3498db'
        }
      },
      currentTrial: null,
      structure: [
        {
          id: 2,
          level: 'block',
          name: 'Block2',
          children: [
            {
              id: 1,
              level: 'trial',
              screenshot: null
            }
          ]
        },
        {
          id: 3,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {
            0: {
              name: 'Condition1',
              color: '#3498db'
            }
          },
          setting: setting
        },
        3: {
          type: trialType,
          name: 'Text',
          condition: {
            0: {
              name: 'Condition1',
              color: '#3498db'
            }
          },
          setting: setting
        }
      },
      messages: []
    }

    const state2 = designReducer(state1, removeCondition(0))

    expect(state2).to.deep.equal({
      counter: 2,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 2,
          level: 'block',
          name: 'Block2',
          children: [
            {
              id: 1,
              level: 'trial',
              screenshot: null
            }
          ]
        },
        {
          id: 3,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        },
        3: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        }
      },
      messages: []
    })
  })

  it('Should handle REMOVE_TRIAL_CONDITION', () => {
    const state1 = {
      counter: 1,
      name: 'Unnamed Experiment',
      condition: {
        0: {
          name: 'Condition1',
          color: '#3498db'
        }
      },
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {
            0: {
              name: 'Condition1',
              color: '#3498db'
            }
          },
          setting: setting
        }
      },
      messages: []
    }

    const state2 = designReducer(state1, removeTrialCondition(1, 0))

    expect(state2).to.deep.equal({
      counter: 1,
      name: 'Unnamed Experiment',
      condition: {
        0: {
          name: 'Condition1',
          color: '#3498db'
        }
      },
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        }
      },
      messages: []
    })
  })

  it('Should handle RENAME_CONDITION', () => {
    const state1 = {
      counter: 0,
      name: 'Unnamed Experiment',
      condition: {
        0: {
          name: 'Condition1',
          color: '#3498db'
        }
      },
      currentTrial: null,
      structure: [],
      entity: {},
      messages: []
    }

    const state2 = designReducer(state1, renameCondition(0, 'Congruent'))

    expect(state2).to.deep.equal({
      counter: 0,
      name: 'Unnamed Experiment',
      condition: {
        0: {
          name: 'Congruent',
          color: '#3498db'
        }
      },
      currentTrial: null,
      structure: [],
      entity: {},
      messages: []
    })
  })

  it('Should handle CHANGE_TRIAL_SETTING', () => {
    const state1 = {
      counter: 1,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: setting
        }
      },
      messages: []
    }

    const state2 = designReducer(state1, changeSetting(1, { fontSize: '66' }))
    const state3 = designReducer(state2, changeSetting(1, { fontWeight: 'bold' }))
    expect(state3).to.deep.equal({
      counter: 1,
      name: 'Unnamed Experiment',
      condition: {},
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          setting: {
            ...setting,
            fontSize: '66',
            fontWeight: 'bold'
          }
        }
      },
      messages: []
    })
  })
})
