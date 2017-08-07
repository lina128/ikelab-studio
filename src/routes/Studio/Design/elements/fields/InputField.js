import React, { PureComponent, PropTypes } from 'react'
import './field.scss'

export default class InputField extends PureComponent {
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
      <div className='design_field_default'>
        <div className='design_field_field'>
          {fieldConstant.name}
        </div>
        <div className='design_field_field'>
          <input
            className='design_inputfield_default'
            style={customStyle}
            value={this.state.value}
            label=''
            onChange={this.handleInputChange}
            onBlur={this.handleChange} />
          {fieldConstant.hints}
        </div>
      </div>
    )
  }
}
