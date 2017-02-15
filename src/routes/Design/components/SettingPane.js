import React, { Component, PropTypes } from 'react'
import './SettingPane.scss'
import * as fieldConstantHandler from '../constants/field.constants'
import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card'
import Button from 'react-mdl/lib/Button'
import DefaultField from './fields/DefaultField'
import ListField from './fields/ListField'
import InputField from './fields/InputField'
import ColorPickerField from './fields/ColorPickerField'

// ------------------------------------
// Constants
// ------------------------------------
export const DEFAULT = 'DEFAULTFIELD'
export const LIST = 'List'
export const INPUT = 'Input'
export const COLORPICKER = 'ColorPicker'

// ------------------------------------
// Field Handlers
// ------------------------------------
export const Fields = {
  [DEFAULT]: DefaultField,
  [LIST]: ListField,
  [INPUT]: InputField,
  [COLORPICKER]: ColorPickerField
}

export default class SettingPane extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    trial: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  handleClick () {
    window.open('http://google.com')
  }

  render () {
    const { trial, onChange } = this.props

    if (trial) {
      const fieldConstant = fieldConstantHandler[trial.type]
      const fieldSetting = trial.setting

      let Field, fieldList = []

      for (let s in fieldConstant) {
        if (fieldConstant[s].display) {
          Field = Fields[fieldConstant[s].type] || Fields[DEFAULT]
          fieldList.push(<Field key={s} trialId={trial.id} fieldConstantKey={s} fieldConstant={fieldConstant[s]} fieldSetting={fieldSetting[s]} onChange={onChange} />)
        }
      }

      return (
        <div className={'design_settingPane_default'}>
          <Card shadow={1}>
            <CardTitle>
              {trial.id} <Button raised accent ripple onClick={this.handleClick}>Preview</Button>
            </CardTitle>
            <CardActions border>
              {fieldList}
            </CardActions>
            <CardActions border>
              <Button raised accent ripple>Done</Button>
            </CardActions>
          </Card>
        </div>
      )
    } else {
      return (
        <div className={'design_settingPane_default'} />
      )
    }
  }
}
