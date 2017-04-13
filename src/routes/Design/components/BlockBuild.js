import React, { PureComponent, PropTypes } from 'react'
import { Card } from 'react-mdl/lib/Card'
import * as Modules from '../elements/settings'
import * as fields from '../elements/fields'

export default class BlockBuild extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    dialogOpen: PropTypes.bool,
    setting: PropTypes.object
  }

  render () {
    const { type, onChange, dialogOpen } = this.props
    const fieldConstant = Modules[type]

    let Field
    let fieldList = []
    let fieldSetting = this.props.setting ? this.props.setting : {}

    for (let s in fieldConstant) {
      if (fieldConstant[s].display) {
        Field = fields[fieldConstant[s].type] || fields['DefaultField']
        fieldList.push(<Field
          key={s}
          trialId={0}
          fieldSetting={fieldSetting[s] || fieldConstant[s].value}
          fieldConstantKey={s}
          fieldConstant={fieldConstant[s]}
          onChange={onChange}
          dialogOpen={dialogOpen} />)
      }
    }

    return (
      <Card style={{ width: '100%', maxHeight: window.innerHeight - 250 + 'px', overflow: 'scroll' }}>
        {fieldList}
      </Card>
    )
  }
}
