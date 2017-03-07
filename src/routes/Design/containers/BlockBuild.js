import React, { Component, PropTypes } from 'react'
import { Card } from 'react-mdl/lib/Card'
import * as Modules from '../elements/settings'
import * as fields from '../elements/fields'

export default class BlockBuild extends Component {
  static propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    dialogOpen: PropTypes.bool
  }

  render () {
    const { type, onChange, dialogOpen } = this.props
    const fieldConstant = Modules[type]

    let Field
    let fieldList = []

    for (let s in fieldConstant) {
      if (fieldConstant[s].display) {
        Field = fields[fieldConstant[s].type] || fields['DefaultField']
        fieldList.push(<Field
          key={s}
          trialId={0}
          fieldSetting=''
          fieldConstantKey={s}
          fieldConstant={fieldConstant[s]}
          onChange={onChange}
          dialogOpen={dialogOpen} />)
      }
    }

    return (
      <Card style={{ width: '100%', maxHeight: window.innerHeight - 250 + 'px', overflow: 'auto' }}>
        {fieldList}
      </Card>
    )
  }
}
