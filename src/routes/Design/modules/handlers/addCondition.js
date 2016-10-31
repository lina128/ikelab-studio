import { ColorPalette } from '../constants'

const addCondition = (state, action) => {
	let color, inc = 0;;
	while(inc < ColorPalette.length) {
		color = ColorPalette[inc];
		if(state.condition.findIndex((c)=>(c.color === color)) === -1) {
			break;
		} else {
			color = null;
			inc++;
		}
	}
	if(color) {
		let newCounterC = state.counter + 1;
		return {
			...state,
			counter: newCounterC,
			condition: [
				...state.condition,
				{
					id: newCounterC,
					name: 'Condition'+newCounterC,
					color: color
				}
			]
		}
	} else {
		return state
	}
}

export default addCondition