import React, { PureComponent, PropTypes } from 'react'
import { InputAreaField } from '../elements/fields'

const DEFAULT_SETTING = ''

export default class MiscComponent extends PureComponent {
  static propTypes = {
    miscKey: PropTypes.string.isRequired,
    misc: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    trial: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }
  render () {
    const { miscKey, misc, id, trial, handleChange } = this.props

    return (
      <InputAreaField
        trialId={id}
        fieldConstantKey={miscKey}
        fieldConstant={misc}
        fieldSetting={trial.setting[miscKey] || DEFAULT_SETTING}
        onChange={handleChange} />
    )
  }
}
