const renameCondition = (state, action) => {
	for(let i=0; i<state.condition.length; i++) {
		if(state.condition[i].id === action.payload.id) {
			return {
				...state,
				condition: [
					...state.condition.slice(0, i),
					{
						...state.condition[i],
						name: action.payload.value
					},
					...state.condition.slice(i+1)
				]
			}
		}
	}
}

export default renameCondition