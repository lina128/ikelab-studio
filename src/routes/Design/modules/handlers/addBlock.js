const addBlock = (state, action) => {
	let newCounterB = state.counter + 1;
	return {
		...state,
		counter: newCounterB,
		structure: [
			...state.structure,
			{
				id: newCounterB,
				level: 'block',
				name: 'Block'+newCounterB,
				children: []
			}
		]
	}
}

export default addBlock