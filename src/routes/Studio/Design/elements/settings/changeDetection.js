const CHANGE_DETECTION = {
  onScreen: {
    name: 'Image to show here',
    type: 'ListField',
    value: 'Image A',
    options: ['Image A', 'Image B'],
    display: true,
    hints: ''
  },
  imageA: {
    name: 'Image A',
    type: 'ImageField',
    value: '',
    options: null,
    display: true,
    hints: ''
  },
  changeA: {
    name: 'Add Redbox in A',
    type: 'RedboxField',
    value: {},
    options: null,
    display: false,
    hints: ''
  },
  changeB: {
    name: 'Add Redbox in B',
    type: 'RedboxField',
    value: {},
    options: null,
    display: false,
    hints: ''
  },
  imageB: {
    name: 'Image B',
    type: 'ImageField',
    value: '',
    options: null,
    display: true,
    hints: ''
  },
  displayMode: {
    name: 'Display Mode',
    type: 'ListField',
    value: 'Flip Between the Two',
    options: ['Flip Between the Two', 'Side by Side'],
    display: true,
    hints: ''
  },
  alignHA: {
    name: 'Horizontal Alignment of A',
    type: 'ListField',
    value: 'center',
    options: ['left', 'center', 'right'],
    display: true,
    hints: ''
  },
  alignVA: {
    name: 'Vertical Alignment of A',
    type: 'ListField',
    value: 'middle',
    options: ['top', 'middle', 'bottom'],
    display: true,
    hints: ''
  },
  widthA: {
    name: 'Width of A',
    type: 'InputField',
    value: '',
    options: null,
    display: true,
    hints: 'px'
  },
  heightA: {
    name: 'Height of A',
    type: 'InputField',
    value: '',
    options: null,
    display: true,
    hints: 'px'
  },
  alignHB: {
    name: 'Horizontal Alignment of B',
    type: 'ListField',
    value: 'center',
    options: ['left', 'center', 'right'],
    display: true,
    hints: ''
  },
  alignVB: {
    name: 'Vertical Alignment of B',
    type: 'ListField',
    value: 'middle',
    options: ['top', 'middle', 'bottom'],
    display: true,
    hints: ''
  },
  widthB: {
    name: 'Width of B',
    type: 'InputField',
    value: '',
    options: null,
    display: true,
    hints: 'px'
  },
  heightB: {
    name: 'Height of B',
    type: 'InputField',
    value: '',
    options: null,
    display: true,
    hints: 'px'
  }
}

export default CHANGE_DETECTION
