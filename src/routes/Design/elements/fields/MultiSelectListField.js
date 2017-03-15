import React, { Component, PropTypes } from 'react'
import MultiSelectField from 'react-mdl-extra/lib/MultiSelectField'
import Option from 'react-mdl-extra/lib/Option'

export default class MultiSelectListField extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.renderOption = this.renderOption.bind(this)
  }

  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleClick (option) {
    const { onChange, trialId, fieldConstantKey } = this.props
    onChange(trialId, { [fieldConstantKey]: option })
  }

  renderOption (option, ind, arr) {
    return (
      <Option key={ind} value={option}>{option}</Option>
    )
  }

  render () {
    const { fieldConstant, fieldSetting } = this.props

    return (
      <div>
        {fieldConstant.name}:
        <MultiSelectField
          label=''
          editable
          value={fieldSetting}
          onChange={this.handleClick}>
          {fieldConstant.options.map(this.renderOption)}
        </MultiSelectField>
        {fieldConstant.hints}
      </div>
    )
  }
}
