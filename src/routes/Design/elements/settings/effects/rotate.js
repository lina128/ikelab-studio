const rotate = {
  duration: {
    name: 'Duration',
    type: 'InputField',
    value: '1000',
    options: null,
    display: true,
    hints: 'ms'
  },
  repeat: {
    name: 'Repeat',
    type: 'InputField',
    value: '-1',
    options: null,
    display: true,
    hints: 'times'
  },
  clockwise: {
    name: 'Clockwise',
    type: 'SwitchField',
    value: true,
    options: null,
    display: true,
    hints: ''
  }
}

export default rotate
