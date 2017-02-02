const changeSetting = (state, action) => {
	for(let i=0; i<state.entities.length; i++) {
		if(state.entities[i].id === action.payload.id) {
			const newState = {
				...state,
				entities: [
					...state.entities.slice(0, i),
					{
						...state.entities[i],
						setting: {
							...state.entities[i].setting,
							...action.payload.setting
						}
					},
					...state.entities.slice(i+1)
				]
			}

			return newState
		}
	}
	
	return state
}

export default changeSetting