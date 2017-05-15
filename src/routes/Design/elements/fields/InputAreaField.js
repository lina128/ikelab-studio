import React, { PureComponent, PropTypes } from 'react'
import Textfield from 'react-mdl/lib/Textfield'

export default class InputAreaField extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { value: this.props.fieldSetting }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    customStyle: PropTypes.object
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.setState({ value: nextProps.fieldSetting })
    }
  }

  handleChange (event) {
    const { onChange, trialId, fieldConstantKey } = this.props
    onChange(trialId, { [fieldConstantKey]: event.target.value })
  }

  handleInputChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    const { fieldConstant, customStyle } = this.props

    return (
      <div>
        {fieldConstant.name}:
        <Textfield
          style={customStyle || { width: '80px' }}
          rows={8}
          value={this.state.value}
          label=''
          onChange={this.handleInputChange}
          onBlur={this.handleChange} />
        {fieldConstant.hints}
      </div>
    )
  }
}
