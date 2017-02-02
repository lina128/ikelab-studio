import { insertNodeAfter } from '../utils/node'
import { TEXT } from '../../constants/field.constants'

const defaultType = 'TEXT';

function defaultSetting() {
	let setting = {};
	
	for(let s in TEXT) {
		setting[s] = TEXT[s].value
	}
	
	return setting
}

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