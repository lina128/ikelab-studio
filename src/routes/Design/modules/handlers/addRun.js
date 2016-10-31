const addRun = (state, action) => {
	let newCounterR = state.counter + 1;
	return {
		...state,
		counter: newCounterR,
		structure: [
			...state.structure,
			{
				id: newCounterR,
				level: 'run',
				color: '#000000',
				name: 'Run'+newCounterR,
				children: []
			}
		]
	}
}

export default addRun