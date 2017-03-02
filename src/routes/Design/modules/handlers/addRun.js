const addRun = (state, action) => {
  let newCounterR = state.counter + 1
  return {
    ...state,
    counter: newCounterR,
    structure: [
      ...state.structure,
      {
        id: newCounterR,
        level: 'run',
        name: 'Run' + newCounterR,
        setting: {
          randomized: false,
          counterbalanced: false
        },
        children: []
      }
    ]
  }
}

export default addRun
