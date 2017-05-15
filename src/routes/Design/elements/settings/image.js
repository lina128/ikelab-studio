const IMAGE = {
  image: {
    name: 'Image',
    type: 'ImageField',
    value: '',
    options: null,
    display: true,
    hints: ''
  },
  alignH: {
    name: 'Horizontal Alignment',
    type: 'ListField',
    value: 'center',
    options: ['left', 'center', 'right'],
    display: true,
    hints: ''
  },
  alignV: {
    name: 'Vertical Alignment',
    type: 'ListField',
    value: 'middle',
    options: ['top', 'middle', 'bottom'],
    display: true,
    hints: ''
  },
  width: {
    name: 'Width',
    type: 'InputField',
    value: '',
    options: null,
    display: true,
    hints: 'px'
  },
  height: {
    name: 'Height',
    type: 'InputField',
    value: '',
    options: null,
    display: true,
    hints: 'px'
  },
  effect: {
    name: 'Effect',
    type: 'EffectField',
    value: {},
    options: ['None', 'blink', 'rotate', 'flip'],
    display: true,
    hints: ''
  }
}

export default IMAGE
