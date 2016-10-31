import { findNode } from '../utils/node'
import { findNodeParent } from '../utils/node'
import { removeNode } from '../utils/node'
import { insertNodeBefore } from '../utils/node'

const moveOutside = (state, action) => {
	const id = action.payload.id;

	const trial = findNode(state.structure, id);

	const parent = findNodeParent(state.structure, id);

	if(parent && parent.id!= id) {
		const newState1 = removeNode(state.structure, id);
		const newState2 = insertNodeBefore(newState1, parent.id, trial);
		
		return {
			...state,
			structure: newState2
		};
	} else {
		return state;
	}
	
	return state;
}

export default moveOutside