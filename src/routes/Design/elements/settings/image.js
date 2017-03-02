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
  fadeIn: {
    name: 'Fade In',
    type: 'InputField',
    value: '',
    options: null,
    display: true,
    hints: 'ms'
  }
}

export default IMAGE
