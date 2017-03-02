const renameCondition = (state, action) => {
  for (let i = 0; i < state.condition.length; i++) {
    if (state.condition[i].color === action.payload.color) {
      return {
        ...state,
        condition: [
          ...state.condition.slice(0, i),
          {
            ...state.condition[i],
            name: action.payload.value
          },
          ...state.condition.slice(i + 1)
        ]
      }
    }
  }

  return state
}

export default renameCondition
