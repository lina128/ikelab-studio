import { removeNode, extend, extendSet } from '../utils/node'

const toggleSelectMode = (state, action) => {
  const selectMode = !state.selectMode
  let newStructure, newEntity

  if (selectMode) {
    if (state.selectId) {
      return state
    } else {
      return {
        ...state,
        selectMode: selectMode,
        selected: [],
        selectId: action.payload.id
      }
    }
  } else {
    if (state.selectId && action.payload.id === state.selectId) {
      if (state.selected.length > 0) {
        if (action.payload.op === 'extend') {
          newStructure = [ ...state.structure ]

          for (let i = 0; i < state.selected.length; i++) {
            newStructure = extend(newStructure, state.selected[i], { selected: false })
          }

          newEntity = { ...state.entity }

          for (let i = 0; i < state.selected.length; i++) {
            newEntity = extendSet(newEntity, state.selected[i], action.payload.setting)
          }

          return {
            ...state,
            selectMode: selectMode,
            selected: [],
            selectId: null,
            structure: newStructure,
            entity: newEntity
          }
        } else if (action.payload.op === 'remove') {
          var newCurrentTrial = state.currentTrial
          newStructure = [ ...state.structure ]
          newEntity = { ...state.entity }
          let result = {}

          for (let i = 0; i < state.selected.length; i++) {
            if (state.selected[i] === state.currentTrial) {
              newCurrentTrial = null
            }

            removeNode(newStructure, newEntity, state.selected[i], result)
            newStructure = [ ...result.arr ]
            newEntity = { ...result.s }

            result = {}
          }

          return {
            ...state,
            currentTrial: newCurrentTrial,
            selectMode: selectMode,
            selected: [],
            selectId: null,
            structure: newStructure,
            entity: newEntity
          }
        }
      } else {
        return {
          ...state,
          selectMode: selectMode,
          selected: [],
          selectId: null
        }
      }
    } else {
      return state
    }
  }
}

export default toggleSelectMode
