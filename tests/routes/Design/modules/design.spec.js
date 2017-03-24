import { addBlock, addBlockTrials, addCondition, addRun, addTrial,
addMessage, deleteMessage,
changeTrialSetting, changeBlockSetting, clickTrial, copyCurrentTrial,
deleteCurrentTrial, moveInside, moveNode, moveOutside,
removeCondition, removeTrialCondition, renameCondition,
selectTrial, toggleSelectMode,
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
      condition: {},
      currentTrial: null,
      structure: [],
      entity: {},
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
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
        condition: {},
        currentTrial: null,
        structure: [
          {
            id: 1,
            level: 'block',
            name: 'Block1',
            blockSetting: {
              randomized: false,
              repeat: 1,
              lockTop: false,
              lockBottom: false
            },
            children: []
          }
        ],
        entity: {},
        selected: [],
        selectId: null,
        selectMode: false,
        messages: [],
        tags: []
      })
    })

    it('Should handle ADD_BLOCK_TRIALS', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addBlockTrials({ setting: [] }, [
        {
          type: 'TEXT',
          name: 'Text',
          condition: {},
          setting: trialSetting
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
        condition: {},
        currentTrial: null,
        structure: [
          {
            id: 1,
            level: 'block',
            name: 'Block1',
            blockSetting: {
              randomized: false,
              repeat: 0,
              lockTop: false,
              lockBottom: false
            },
            children: [
              {
                id: 2,
                level: 'trial',
                selected: false,
                screenshot: null
              },
              {
                id: 3,
                level: 'trial',
                selected: false,
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
            trialSetting: trialSetting
          },
          3: {
            type: 'TEXT',
            name: 'Text',
            condition: {},
            trialSetting: { ...trialSetting, font: 66 }
          }
        },
        selected: [],
        selectId: null,
        selectMode: false,
        messages: [],
        tags: []
      })
    })

    it('Should handle ADD_CONDITION', () => {
      const state1 = designReducer(undefined, {})
      expect(state1).to.deep.equal(_initialState)
      const state2 = designReducer(state1, addCondition())
      expect(state2).to.deep.equal({
        counter: 0,
        condition: {
          0: {
            name: 'NewCondition',
            color: '#3498db'
          }
        },
        currentTrial: null,
        structure: [],
        entity: {},
        selected: [],
        selectId: null,
        selectMode: false,
        messages: [],
        tags: []
      })
    })

    it('Should handle ADD_RUN', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addRun())
      expect(state2).to.deep.equal({
        counter: 1,
        condition: {},
        currentTrial: null,
        structure: [
          {
            id: 1,
            level: 'run',
            name: 'Run1',
            runSetting: {
              randomized: false,
              counterbalanced: false
            },
            children: []
          }
        ],
        entity: {},
        selected: [],
        selectId: null,
        selectMode: false,
        messages: [],
        tags: []
      })
    })

    it('Should handle ADD_MESSAGE', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addMessage({ html:'Loading' }))

      expect(state2).to.deep.equal({
        counter: 0,
        condition: {},
        currentTrial: null,
        structure: [],
        entity: {},
        selected: [],
        selectId: null,
        selectMode: false,
        messages: [
          {
            id: 1,
            html: 'Loading'
          }
        ],
        tags: []
      })
    })

    it('Should handle DELETE_MESSAGE', () => {
      const state1 = {
        counter: 0,
        condition: {},
        currentTrial: null,
        structure: [],
        entity: {},
        selected: [],
        selectId: null,
        selectMode: false,
        messages: [
          {
            id: 1,
            html: 'Loading'
          }
        ],
        tags: []
      }

      const state2 = designReducer(state1, deleteMessage(1))

      expect(state2).to.deep.equal({
        counter: 0,
        condition: {},
        currentTrial: null,
        structure: [],
        entity: {},
        selected: [],
        selectId: null,
        selectMode: false,
        messages: [],
        tags: []
      })
    })

    it('Should handle ADD_TRIAL', () => {
      const state1 = designReducer(undefined, {})
      const state2 = designReducer(state1, addTrial(trialType, 'Text'))

      expect(state2).to.deep.equal({
        counter: 1,
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false,
        messages: [],
        tags: ['Text']
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
            selected: false,
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            selected: false,
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          },
          2: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
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
            selected: false,
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            selected: false,
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          },
          2: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle COPY_CURRENT_TRIAL', () => {
      const state1 = {
        counter: 1,
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state2 = designReducer(state1, copyCurrentTrial())

      expect(state2).to.deep.equal({
        counter: 2,
        condition: {},
        currentTrial: 2,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            screenshot: null
          },
          {
            id: 2,
            level: 'trial',
            selected: false,
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          },
          2: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle DELETE_CURRENT_TRIAL', () => {
      const state1 = {
        counter: 1,
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
            screenshot: null
          }
        ],
        entity: {
          1: {
            type: trialType,
            name: 'Text',
            condition: {},
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state2 = designReducer(state1, deleteCurrentTrial())
      expect(state2).to.deep.equal({
        counter: 1,
        condition: {},
        currentTrial: null,
        structure: [],
        entity: {},
        selected: [],
        selectId: null,
        selectMode: false
      })
    })

    it('Should handle MOVE_INSIDE', () => {
      const state1 = {
        counter: 2,
        condition: {},
        currentTrial: 1,
        structure: [
          {
            id: 1,
            level: 'trial',
            selected: false,
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
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state2 = designReducer(state1, moveInside(1, 2))

      expect(state2).to.deep.equal({
        counter: 2,
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
                selected: false,
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
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
      })

      const state3 = {
        counter: 3,
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
                selected: false,
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
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
      }

      const state4 = designReducer(state3, moveInside(2, 3))

      expect(state4).to.deep.equal({
        counter: 3,
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
                    selected: false,
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
            trialSetting: trialSetting
          }
        },
        selected: [],
        selectId: null,
        selectMode: false
      })
    })
  })

  it('Should handle MOVE_NODE (trial)', () => {
    const state1 = {
      counter: 2,
      condition: {},
      currentTrial: 2,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          screenshot: null
        },
        {
          id: 2,
          level: 'trial',
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        },
        2: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
      condition: {},
      currentTrial: 2,
      structure: [
        {
          id: 2,
          level: 'trial',
          selected: false,
          screenshot: null
        },
        {
          id: 1,
          level: 'trial',
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        },
        2: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
      condition: {},
      currentTrial: 2,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          screenshot: null
        },
        {
          id: 2,
          level: 'trial',
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        },
        2: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle MOVE_NODE (block)', () => {
    const state1 = {
      counter: 2,
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
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
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
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
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
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle MOVE_NODE (run)', () => {
    const state1 = {
      counter: 2,
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
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }

    const state2 = designReducer(state1, moveNode(1, 2, 'DOWN'))

    expect(state2).to.deep.equal({
      counter: 2,
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
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })

    const state3 = designReducer(state2, moveNode(1, 2, 'UP'))

    expect(state3).to.deep.equal({
      counter: 2,
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
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle MOVE_OUTSIDE', () => {
    const state1 = {
      counter: 2,
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
              selected: false,
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
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }

    const state2 = designReducer(state1, moveOutside(1))

    expect(state2).to.deep.equal({
      counter: 2,
      condition: {},
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
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
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle REMOVE_CONDITION', () => {
    const state1 = {
      counter: 2,
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
              selected: false,
              screenshot: null
            }
          ]
        },
        {
          id: 3,
          level: 'trial',
          selected: false,
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
          trialSetting: trialSetting
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
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }

    const state2 = designReducer(state1, removeCondition(0))

    expect(state2).to.deep.equal({
      counter: 2,
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
              selected: false,
              screenshot: null
            }
          ]
        },
        {
          id: 3,
          level: 'trial',
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        },
        3: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle REMOVE_TRIAL_CONDITION', () => {
    const state1 = {
      counter: 1,
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
          selected: false,
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
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }

    const state2 = designReducer(state1, removeTrialCondition(1, 0))

    expect(state2).to.deep.equal({
      counter: 1,
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
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle RENAME_CONDITION', () => {
    const state1 = {
      counter: 0,
      condition: {
        0: {
          name: 'Condition1',
          color: '#3498db'
        }
      },
      currentTrial: null,
      structure: [],
      entity: {},
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }

    const state2 = designReducer(state1, renameCondition(0, 'Congruent'))

    expect(state2).to.deep.equal({
      counter: 0,
      condition: {
        0: {
          name: 'Congruent',
          color: '#3498db'
        }
      },
      currentTrial: null,
      structure: [],
      entity: {},
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle CHANGE_BLOCK_SETTING', () => {
    const state1 = {
      counter: 1,
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 1,
          level: 'block',
          name: 'Block1',
          blockSetting: {
            randomized: false,
            repeat: 0,
            lockTop: false,
            lockBottom: false
          },
          children: []
        }
      ],
      entity: {},
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }
    const state2 = designReducer(state1, changeBlockSetting(1, { randomized: true }))

    expect(state2).to.deep.equal({
      counter: 1,
      condition: {},
      currentTrial: null,
      structure: [
        {
          id: 1,
          level: 'block',
          name: 'Block1',
          blockSetting: {
            randomized: true,
            repeat: 0,
            lockTop: false,
            lockBottom: false
          },
          children: []
        }
      ],
      entity: {},
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle CHANGE_TRIAL_SETTING', () => {
    const state1 = {
      counter: 1,
      condition: {},
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    }

    const state2 = designReducer(state1, changeTrialSetting(1, { fontSize: '66' }))
    const state3 = designReducer(state2, changeTrialSetting(1, { fontWeight: 'bold' }))
    expect(state3).to.deep.equal({
      counter: 1,
      condition: {},
      currentTrial: 1,
      structure: [
        {
          id: 1,
          level: 'trial',
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: {
            ...trialSetting,
            fontSize: '66',
            fontWeight: 'bold'
          }
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle TOGGLE_SELECT_MODE', () => {
    const state1 = designReducer(undefined, {})
    const state2 = designReducer(state1,
      toggleSelectMode('testId', { condition: { 0: { name: 'Condition1', color: '#3498db' } } }, 'extend'))

    expect(state2).to.deep.equal({
      counter: 0,
      condition: {},
      currentTrial: null,
      structure: [],
      entity: {},
      selected: [],
      selectId: 'testId',
      selectMode: true,
      messages: [],
      tags: []
    })

    const state3 = designReducer(state2,
      toggleSelectMode('anotherId', { condition: { 1: { name: 'Condition2', color: '#000000' } } }, 'extend'))

    expect(state3).to.deep.equal({
      counter: 0,
      condition: {},
      currentTrial: null,
      structure: [],
      entity: {},
      selected: [],
      selectId: 'testId',
      selectMode: true,
      messages: [],
      tags: []
    })

    const state4 = designReducer(state3,
      toggleSelectMode('testId', { condition: { 0: { name: 'Condition1', color: '#3498db' } } }, 'extend'))

    expect(state4).to.deep.equal({
      counter: 0,
      condition: {},
      currentTrial: null,
      structure: [],
      entity: {},
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: []
    })
  })

  it('Should handle SELECT_TRIAL', () => {
    const state1 = {
      counter: 1,
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
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: null,
      selectMode: false,
      messages: [],
      tags: ['Text']
    }
    const state2 = designReducer(state1,
      toggleSelectMode('testId', { condition: { 0: { name: 'Condition1', color: '#3498db' } } }, 'extend'))
    const state3 = designReducer(state2, selectTrial(1))

    expect(state3).to.deep.equal({
      counter: 1,
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
          selected: true,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [1],
      selectId: 'testId',
      selectMode: true,
      messages: [],
      tags: ['Text']
    })

    const state4 = designReducer(state3, selectTrial(1))

    expect(state4).to.deep.equal({
      counter: 1,
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
          selected: false,
          screenshot: null
        }
      ],
      entity: {
        1: {
          type: trialType,
          name: 'Text',
          condition: {},
          trialSetting: trialSetting
        }
      },
      selected: [],
      selectId: 'testId',
      selectMode: true,
      messages: [],
      tags: ['Text']
    })
  })
})
