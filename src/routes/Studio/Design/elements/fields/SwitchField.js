import React, { PureComponent, PropTypes } from 'react'
import Switch from 'react-mdl/lib/Switch'

export default class InputField extends PureComponent {
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
      <div className='design_field_default'>
        <div className='design_field_field'>{fieldConstant.name}</div>
        <div className='design_field_field'>
          <Switch
            ripple
            checked={fieldSetting}
            onChange={this.handleChange} />
          {fieldConstant.hints}
        </div>
      </div>
    )
  }
}
