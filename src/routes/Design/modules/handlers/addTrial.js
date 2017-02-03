import { insertNodeAfter } from '../utils/node'
import { defaultType } from '../../constants'
import { DEFAULTMODULE } from '../../constants/field.constants'

function defaultSetting() {
	let setting = {};
	
	for(let s in DEFAULTMODULE) {
		setting[s] = DEFAULTMODULE[s].value
	}
	
	return setting
}

const addTrial = (state, action) => {
	let newCounterT = state.counter + 1;
	if(state.currentTrial) {
		return {
			...state,
			currentTrial: newCounterT,
			counter: newCounterT,
			structure: insertNodeAfter(
				state.structure, 
				state.currentTrial, 
				{
					id: newCounterT,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				}),
			entities: [
				...state.entities,
				{
					id: newCounterT,
					type: defaultType,
					setting: defaultSetting()
				}
			]
		}
	} else {
		return {
			...state,
			currentTrial: newCounterT,
			counter: newCounterT,
			structure: [
				...state.structure,
				{
					id: newCounterT,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				}
			],
			entities: [
				...state.entities,
				{
					id: newCounterT,
					type: defaultType,
					setting: defaultSetting()
				}
			]
		}
	}
}

export default addTrial