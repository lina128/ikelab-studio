const TEXT = {
  content: {
    name: 'Content',
    type: 'TextArea',
    value: '',
    options: null,
    display: false,
    hints: ''
  },
  font: {
    name: 'Font',
    type: 'ListField',
    value: 'Arial',
    options: ['Courier', 'Arial', 'Times', 'sans-serif', 'serif'],
    display: true,
    hints: ''
  },
  fontSize: {
    name: 'Font Size',
    type: 'InputField',
    value: 16,
    options: null,
    display: true,
    hints: 'pt'
  },
  fontWeight: {
    name: 'Font Weight',
    type: 'ListField',
    value: 'normal',
    options: ['normal', 'bold'],
    display: true,
    hints: ''
  },
  fontColor: {
    name: 'Font Color',
    type: 'InputField',
    value: '#000000',
    options: null,
    display: true,
    hints: ''
  }
}

export default TEXT
