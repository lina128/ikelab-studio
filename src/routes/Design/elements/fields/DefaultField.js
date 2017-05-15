import React, { PureComponent, PropTypes } from 'react'

export default class DefaultField extends PureComponent {
  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render () {
    const { fieldConstant, fieldSetting } = this.props

    return (
      <div>
        {fieldConstant.name}:
        {fieldSetting}
      </div>
    )
  }
}
