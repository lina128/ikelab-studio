import React, { PureComponent, PropTypes } from 'react'
import RESPONSE from '../elements/settings/response'
import * as fields from '../elements/fields'
import './TrialToolsVertical.scss'

export default class TrialToolsVertical extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    trial: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  render () {
    const { id, trial, handleChange } = this.props

    const fieldConstant = RESPONSE
    const fieldSetting = trial.setting

    let Field
    let fieldList = []

    for (let s in fieldConstant) {
      if (fieldConstant[s].display) {
        Field = fields[fieldConstant[s].type] || fields['DefaultField']
        fieldList.push(
          <Field
            key={s}
            trialId={id}
            fieldConstantKey={s}
            fieldConstant={fieldConstant[s]}
            fieldSetting={fieldSetting[s] || fieldConstant[s].value}
            onChange={handleChange} />)
      }
    }

    return (
      <div className='design_trialToolsVertical_default'>
        {fieldList}
      </div>
    )
  }
}
