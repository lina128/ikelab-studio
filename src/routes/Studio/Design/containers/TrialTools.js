import React, {
  Component,
  PropTypes
} from 'react'
import { connect } from 'react-redux'
import * as Modules from '../elements/settings'
import * as fields from '../elements/fields'
import { changeSetting } from '../modules/design'
import './TrialTools.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id, change) => {
      dispatch(changeSetting(id, change))
    }
  }
}

export class TrialTools extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    trial: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  render () {
    const { id, trial, handleChange } = this.props

    const fieldConstant = Modules[trial.type]
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
            fieldSetting={fieldSetting[s]}
            onChange={handleChange} />)
      }
    }

    return (
      <div className='design_trialtools_default'>
        {fieldList}
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(TrialTools)
