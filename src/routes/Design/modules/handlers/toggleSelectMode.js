import { removeNode, extend } from '../utils/node'

const toggleSelectMode = (state, action) => {
  const selectMode = !state.selectMode
  let newStructure, newEntities

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
          newStructure = [...state.structure]

          for (let i = 0; i < state.selected.length; i++) {
            newStructure = extend(newStructure, state.selected[i], action.payload.setting)
            newStructure = extend(newStructure, state.selected[i], { selected: false })
          }

          newEntities = [...state.entities]

          for (let i = 0; i < state.selected.length; i++) {
            newEntities = extend(newEntities, state.selected[i], action.payload.setting)
          }

          return {
            ...state,
            selectMode: selectMode,
            selected: [],
            selectId: null,
            structure: newStructure,
            entities: newEntities
          }
        } else if (action.payload.op === 'remove') {
          var newCurrentTrial = state.currentTrial
          newStructure = [...state.structure]

          for (let i = 0; i < state.selected.length; i++) {
            if (state.selected[i] === state.currentTrial) {
              newCurrentTrial = null
            }
            newStructure = removeNode(newStructure, state.selected[i])
          }

          newEntities = [...state.entities]

          for (let i = 0; i < state.selected.length; i++) {
            newEntities = removeNode(state.entities, state.selected[i])
          }

          return {
            ...state,
            currentTrial: newCurrentTrial,
            selectMode: selectMode,
            selected: [],
            selectId: null,
            structure: newStructure,
            entities: newEntities
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
