import { insertNodeAfter } from '../utils/node'

const defaultType = 'TEXT'
const defaultSetting = {
	content: {
		type: 'TextArea',
		value: 'TEXT'
	},
	font: {
		type: 'List',
		value: 'Arial'
	},
	fontSize: {
		type: 'Number',
		value: 12
	},
	fontWeight: {
		type: 'List',
		value: 'normal'
	},
	fontColor: {
		type: 'ColorPicker',
		value: '#000000'
	},
	alignH: {
		type: 'List',
		value: 'center'
	},
	alignV: {
		type: 'List',
		value: 'middle'
	}
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