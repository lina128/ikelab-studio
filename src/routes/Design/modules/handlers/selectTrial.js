import { findNode } from '../utils/node'
import { extend } from '../utils/node'

const selectTrial = (state, action) => {
	const id = action.payload.id;
	
	const trial = findNode(state.structure, id);

	const newState1 = extend(state.structure, id, {selected: !trial.selected});
	
	const isSelected = state.selected.indexOf(id);
	
	if(isSelected > -1) {
		return {
			...state,
			structure: newState1,
			selected: [
					...state.selected.slice(0, isSelected),
					...state.selected.slice(isSelected+1)
			]
		}
	} else {
		return {
			...state,
			structure: newState1,
			selected: [
					...state.selected,
					id
			]
		}
	}
	
	return state;
}

export default selectTrial