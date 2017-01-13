import { insertNodeAfter } from '../utils/node'
import { defaultType, defaultSetting } from '../constants'

const addTrial = (state, action) => {
	let newCounterT = state.counter + 1;
	if(state.currentTrial) {
		return {
			...state,
			counter: newCounterT,
			structure: insertNodeAfter(
				state.structure, 
				state.currentTrial, 
				{
					id: newCounterT,
					level: 'trial',
					selected: false,
					condition: []
				}),
			entities: [
				...state.entities,
				{
					id: newCounterT,
					type: defaultType,
					setting: defaultSetting
				}
			]
		}
	} else {
		return {
			...state,
			counter: newCounterT,
			structure: [
				...state.structure,
				{
					id: newCounterT,
					level: 'trial',
					selected: false,
					condition: []
				}
			],
			entities: [
				...state.entities,
				{
					id: newCounterT,
					type: defaultType,
					setting: defaultSetting
				}
			]
		}
	}
}

export default addTrial