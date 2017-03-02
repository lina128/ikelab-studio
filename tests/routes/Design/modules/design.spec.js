import { addBlock, addCondition, addRun, addTrial,
clickTrial, copyCurrentTrial, deleteCurrentTrial,
moveInside, moveNode, moveOutside, removeCondition,
removeTrialCondition, renameCondition, selectTrial, toggleSelectMode,
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

  const trialSetting = getSetting()
  const trialType = 'TEXT'

  beforeEach(() => {
    _initialState = {
      counter: 0,
      condition: [],
      currentTrial: null,
      structure: [],
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
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
        condition: [],
        currentTrial: null,
        structure: [
          {
            id: 1,
            level: 'block',
            name: 'Block1',
            children: []
          }
        ],
        entities: [],
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle ADD_CONDITION', () => {
      const state1 = designReducer(undefined, {})
      expect(state1).to.deep.equal(_initialState)
      const state2 = designReducer(state1, addCondition())
      expect(state2).to.deep.equal({
        counter: 0,
        condition: [
          {
            name: 'NewCondition',
            color: '#3498db'
          }
        ],
        currentTrial: null,
        structure: [],
        entities: [],
        selected: [],
        selectId: null,
        selectMode: false
      })

      const state3 = designReducer(state2, addCondition())
      expect(state3).to.deep.equal({
        counter: 0,
        condition: [
          {
            name: 'NewCondition',
            color: '#3498db'
          },
          {
            name: 'NewCondition',
            color: '#e74c3c'
          }
        ],
        currentTrial: null,
        structure: [],
        entities: [],
        selected: [],
        selectId: null,
        selectMode: false
      })
      const state4 = designReducer(state3, addCondition())
      const state5 = designReducer(state4, addCondition())
      const state6 = designReducer(state5, addCondition())
      const state7 = designReducer(state6, addCondition())
      const state8 = designReducer(state7, addCondition())
      const state9 = designReducer(state8, addCondition())
      const state10 = designReducer(state9, addCondition())
      const state11 = designReducer(state10, addCondition())
      const state12 = designReducer(state11, addCondition())
      expect(state12).to.deep.equal({
        counter: 0,
        condition: [
          {
            name: 'NewCondition',
            color: '#3498db'
          },
          {
            name: 'NewCondition',
            color: '#e74c3c'
          },
          {
            name: 'NewCondition',
            color: '#1abc9c'
          },
          {
            name: 'NewCondition',
            color: '#f39c12'
          },
          {
            name: 'NewCondition',
            color: '#446cb3'
          },
          {
            name: 'NewCondition',
            color: '#e08283'
          },
          {
            name: 'NewCondition',
            color: '#674172'
          },
          {
            name: 'NewCondition',
            color: '#1e824c'
          },
          {
            name: 'NewCondition',
            color: '#2c3e50'
          },
          {
            name: 'NewCondition',
            color: '#d2527f'
          }
        ],
        currentTrial: null,
        structure: [],
        entities: [],
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle ADD_RUN', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addRun())
      expect(state2).to.deep.equal({
        counter: 1,
        condition: [],
        currentTrial: null,
        structure: [
          {
            id: 1,
            level: 'run',
            name: 'Run1',
            children: []
          }
        ],
        entities: [],
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle ADD_TRIAL', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addTrial(trialType))

      expect(state2).to.deep.equal({
        counter: 1,
        condition: [],
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle CLICK_TRIAL', () => {
      const state1 = {
        counter: 1,
        condition: [],
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          },
          {
            id: 2,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state2 = designReducer(state1, clickTrial(2))
      expect(state2).to.deep.equal({
        counter: 1,
        condition: [],
        currentTrial: 2,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          },
          {
            id: 2,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle COPY_CURRENT_TRIAL', () => {
      const state1 = {
        counter: 1,
        condition: [],
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state2 = designReducer(state1, copyCurrentTrial())

      expect(state2).to.deep.equal({
        counter: 2,
        condition: [],
        currentTrial: 2,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          },
          {
            id: 2,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle DELETE_CURRENT_TRIAL', () => {
      const state1 = {
        counter: 1,
        condition: [],
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state2 = designReducer(state1, deleteCurrentTrial())
      expect(state2).to.deep.equal({
        counter: 1,
        condition: [],
        currentTrial: null,
        structure: [],
        entities: [],
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle MOVE_INSIDE', () => {
      const state1 = {
        counter: 2,
        condition: [],
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            condition: [],
            screenshot: null
          },
          {
            id: 2,
            level: 'block',
            name: 'Block2',
            children: []
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state2 = designReducer(state1, moveInside(1, 2))

      expect(state2).to.deep.equal({
        counter: 2,
        condition: [],
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
                selected: false,
                condition: [],
                screenshot: null
              }
            ]
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      })

      const state3 = {
        counter: 3,
        condition: [],
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
                selected: false,
                condition: [],
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
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state4 = designReducer(state3, moveInside(2, 3))

      expect(state4).to.deep.equal({
        counter: 3,
        condition: [],
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
                    selected: false,
                    condition: [],
                    screenshot: null
                  }
                ]
              }
            ]
          }
        ],
        entities: [
          {
            id: 1,
            type: trialType,
            setting: trialSetting
          }
        ],
        selected: [],
        selectId: null,
        selectMode: false
      })
    })
  })

  it('Should handle MOVE_NODE (trial)', () => {
    const state1 = {
      counter: 2,
      condition: [],
      currentTrial: 2,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        },
        {
          id: 2,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        },
        {
          id: 2,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
      condition: [],
      currentTrial: 2,
      structure: [
        {
          id: 2,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        },
        {
          id: 1,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        },
        {
          id: 2,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
      condition: [],
      currentTrial: 2,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        },
        {
          id: 2,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        },
        {
          id: 2,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    })
  })

  it('Should handle MOVE_NODE (block)', () => {
    const state1 = {
      counter: 2,
      condition: [],
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
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
      condition: [],
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
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
      condition: [],
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
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    })
  })

  it('Should handle MOVE_NODE (run)', () => {
    const state1 = {
      counter: 2,
      condition: [],
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
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
      condition: [],
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
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
      condition: [],
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
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    })
  })

  it('Should handle MOVE_OUTSIDE', () => {
    const state1 = {
      counter: 2,
      condition: [],
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
              selected: false,
              condition: [],
              screenshot: null
            }
          ]
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    }

    const state2 = designReducer(state1, moveOutside(1))

    expect(state2).to.deep.equal({
      counter: 2,
      condition: [],
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        },
        {
          id: 2,
          level: 'block',
          name: 'Block2',
          children: []
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    })
  })

  it('Should handle REMOVE_CONDITION', () => {
    const state1 = {
      counter: 2,
      condition: [
        {
          name: 'Condition1',
          color: '#3498db'
        }
      ],
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
              selected: false,
              condition: ['#3498db'],
              screenshot: null
            }
          ]
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    }

    const state2 = designReducer(state1, removeCondition('#3498db'))

    expect(state2).to.deep.equal({
      counter: 2,
      condition: [],
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
              selected: false,
              condition: [],
              screenshot: null
            }
          ]
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    })
  })

  it('Should handle REMOVE_TRIAL_CONDITION', () => {
    const state1 = {
      counter: 1,
      condition: [
        {
          name: 'Condition1',
          color: '#3498db'
        }
      ],
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          condition: ['#3498db'],
          screenshot: null
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    }

    const state2 = designReducer(state1, removeTrialCondition(1, '#3498db'))

    expect(state2).to.deep.equal({
      counter: 1,
      condition: [
        {
          name: 'Condition1',
          color: '#3498db'
        }
      ],
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: null,
      selectMode: false
    })
  })

  it('Should handle RENAME_CONDITION', () => {
    const state1 = {
      counter: 0,
      condition: [
        {
          name: 'Condition1',
          color: '#3498db'
        }
      ],
      currentTrial: null,
      structure: [],
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    }

    const state2 = designReducer(state1, renameCondition('#3498db', 'Congruent'))

    expect(state2).to.deep.equal({
      counter: 0,
      condition: [
        {
          name: 'Congruent',
          color: '#3498db'
        }
      ],
      currentTrial: null,
      structure: [],
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    })
  })

  it('Should handle TOGGLE_SELECT_MODE', () => {
    const state1 = designReducer(undefined, {})
    const state2 = designReducer(state1, toggleSelectMode('testId', { condition: ['#3498db'] }, 'extend'))

    expect(state2).to.deep.equal({
      counter: 0,
      condition: [],
      currentTrial: null,
      structure: [],
      entities: [],
      selected: [],
      selectId: 'testId',
      selectMode: true
    })

    const state3 = designReducer(state2, toggleSelectMode('anotherId', { condition: ['#000000'] }, 'extend'))

    expect(state3).to.deep.equal({
      counter: 0,
      condition: [],
      currentTrial: null,
      structure: [],
      entities: [],
      selected: [],
      selectId: 'testId',
      selectMode: true
    })

    const state4 = designReducer(state3, toggleSelectMode('testId', { condition: ['#3498db'] }, 'extend'))

    expect(state4).to.deep.equal({
      counter: 0,
      condition: [],
      currentTrial: null,
      structure: [],
      entities: [],
      selected: [],
      selectId: null,
      selectMode: false
    })
  })

  it('Should handle SELECT_TRIAL', () => {
    const state1 = designReducer(undefined, {})
    const state2 = designReducer(state1, toggleSelectMode('testId', { condition: ['#3498db'] }, 'extend'))
    const state3 = designReducer(state2, addTrial(trialType))
    const state4 = designReducer(state3, selectTrial(1))

    expect(state4).to.deep.equal({
      counter: 1,
      condition: [],
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: true,
          condition: [],
          screenshot: null
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [1],
      selectId: 'testId',
      selectMode: true
    })

    const state5 = designReducer(state4, selectTrial(1))

    expect(state5).to.deep.equal({
      counter: 1,
      condition: [],
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          condition: [],
          screenshot: null
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [],
      selectId: 'testId',
      selectMode: true
    })

    const state6 = designReducer(state5, selectTrial(1))
    expect(state6).to.deep.equal({
      counter: 1,
      condition: [],
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: true,
          condition: [],
          screenshot: null
        }
      ],
      entities: [
        {
          id: 1,
          type: trialType,
          setting: trialSetting
        }
      ],
      selected: [1],
      selectId: 'testId',
      selectMode: true
    })
  })
})
