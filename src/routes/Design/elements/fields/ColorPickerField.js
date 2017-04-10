import React, { Component, PropTypes } from 'react'
import { BlockPicker } from 'react-color'

export default class ColorPickerField extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleChange (color) {
    const { onChange, trialId, fieldConstantKey } = this.props
    onChange(trialId, { [fieldConstantKey]: color.hex })
  }

  render () {
    const { fieldConstant, fieldSetting } = this.props

    return (
      <div>
        {fieldConstant.name}:
        <BlockPicker color={fieldSetting} onChange={this.handleChange} />
        {fieldConstant.hints}
      </div>
    )
  }
}
