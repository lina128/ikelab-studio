import React, { PureComponent, PropTypes } from 'react'
import * as Effects from '../settings/effects/'
import * as fields from './'
import Menu from 'react-mdl-extra/lib/Menu'
import MenuItem from 'react-mdl-extra/lib/MenuItem'
import Button from 'react-mdl/lib/Button'

export default class EffectField extends PureComponent {
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
    const { onChange, trialId, fieldConstantKey, fieldSetting } = this.props

    if (option === '') {
      onChange(trialId, { [fieldConstantKey]: {} })
    } else {
      if (option !== fieldSetting.type) {
        const fieldConstant = Effects[option]
        let setting = {}
        for (let s in fieldConstant) {
          setting[s] = fieldConstant[s].value
        }
        onChange(trialId, { [fieldConstantKey]: { type: option, setting: setting } })
      }
    }
  }

  handleEffectChange (id, change) {
    const { onChange, fieldSetting } = this.props
    onChange(id, { effect: { ...fieldSetting, ...change } })
  }

  renderOption (option, ind, arr) {
    return (
      <MenuItem key={ind} onClick={() => this.handleClick(option)}>{option}</MenuItem>
    )
  }

  renderEffect (setting) {
    const { trialId } = this.props
    const fieldConstant = Effects[setting.type]
    const fieldSetting = setting.setting

    let Field
    let fieldList = []

    for (let s in fieldConstant) {
      if (fieldConstant[s].display) {
        Field = fields[fieldConstant[s].type] || fields['DefaultField']
        fieldList.push(<Field
          key={s}
          trialId={trialId}
          fieldConstantKey={s}
          fieldConstant={fieldConstant[s]}
          fieldSetting={fieldSetting[s]}
          onChange={this.handleEffectChange} />)
      }
    }

    return fieldList
  }

  render () {
    const { fieldConstant, fieldSetting } = this.props

    const btn = (<Button style={{ width: '124px' }} raised colored ripple>
      {fieldSetting.type ? fieldSetting.type : 'None'}
    </Button>)

    return (
      <div>
        {fieldConstant.name}:
        <Menu target={btn} align={'tl bl'}>
          {fieldConstant.options.map(this.renderOption)}
        </Menu>
        {fieldConstant.hints}
        <div>
          {fieldSetting.type ? this.renderEffect(fieldSetting) : null}
        </div>
      </div>
    )
  }
}
