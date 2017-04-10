import React, { Component, PropTypes } from 'react'
import Switch from 'react-mdl/lib/Switch'

export default class InputField extends Component {
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

  handleChange (event) {
    const { onChange, trialId, fieldConstantKey } = this.props
    onChange(trialId, { [fieldConstantKey]: event.target.checked })
  }

  render () {
    const { fieldConstant, fieldSetting } = this.props

    return (
      <div>
        {fieldConstant.name}:
        <Switch
          ripple
          checked={fieldSetting}
          onChange={this.handleChange} />
        {fieldConstant.hints}
      </div>
    )
  }
}
