const addBlock = (state, action) => {
  let newCounterB = state.counter + 1
  return {
    ...state,
    counter: newCounterB,
    structure: [
      ...state.structure,
      {
        id: newCounterB,
        level: 'block',
        name: 'Block' + newCounterB,
        blockSetting: {
          randomized: false,
          repeat: 1,
          lockTop: false,
          lockBottom: false
        },
        children: []
      }
    ],
    didChange: true
  }
}

export default addBlock
