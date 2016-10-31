import { findNode } from '../utils/node'
import { removeNode } from '../utils/node'
import { insertNodeIn } from '../utils/node'

const moveInside = (state, action) => {
	const id = action.payload.id;
	const parentId = action.payload.parentId;
	
	const trial = findNode(state.structure, id);
	const newState1 = removeNode(state.structure, id);
	const newState2 = insertNodeIn(newState1, parentId, trial);
	
	return {
			...state,
		structure: newState2
	}
}

export default moveInside