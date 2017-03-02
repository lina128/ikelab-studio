import React, {
  Component,
  PropTypes
} from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { findIndexById } from '../utils/findIndex'
import { changeSetting, copyCurrentTrial, deleteCurrentTrial } from '../modules/design'
import * as Modules from '../elements/settings'
import * as fields from '../elements/fields'
import {
  Card,
  CardTitle,
  CardActions
} from 'react-mdl/lib/Card'
import OpenExperimentButton from '../components/OpenExperimentButton'
import IconButton from 'react-mdl/lib/IconButton'
import Button from 'react-mdl/lib/Button'

const getEntities = (state) => state.design.present.entities
const getCurrentTrial = (state) => state.design.present.currentTrial

const getTrialMemoized = createSelector(
  [ getEntities, getCurrentTrial ],
  (entities, currentTrial) => {
    if (!currentTrial) {
      return null
    } else {
      return entities[findIndexById(entities, currentTrial)]
    }
  }
)

const mapStateToProps = (state) => {
  return {
    trial: getTrialMemoized(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id, change) => {
      dispatch(changeSetting(id, change))
    },
    handleCopy: () => {
      dispatch(copyCurrentTrial())
    },
    handleDelete: () => {
      dispatch(deleteCurrentTrial())
    }
  }
}

export class SettingPane extends Component {
  constructor (props) {
    super(props)
    this.postMessage = this.postMessage.bind(this)
  }

  static propTypes = {
    trial: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleCopy: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  postMessage (target, event) {
    if (event.origin === 'http://localhost:3000' && event.data === 'loaded') {
      target.postMessage(this.props.trial, 'http://localhost:3000')
    }
  }

  render () {
    const {
      trial,
      handleChange,
      handleCopy,
      handleDelete
    } = this.props

    if (trial) {
      const fieldConstant = Modules[trial.type]
      const fieldSetting = trial.setting

      let Field
      let fieldList = []

      for (let s in fieldConstant) {
        if (fieldConstant[s].display) {
          Field = fields[fieldConstant[s].type] || fields['DefaultField']
          fieldList.push(<Field
            key={s}
            trialId={trial.id}
            fieldConstantKey={s}
            fieldConstant={fieldConstant[s]}
            fieldSetting={fieldSetting[s]}
            onChange={handleChange} />)
        }
      }

      const noteConstant = {
        name: 'Note',
        type: 'InputField',
        value: '',
        options: null,
        display: true,
        hints: ''
      }

      const reminderConstant = {
        name: 'Reminder',
        type: 'InputField',
        value: '',
        options: null,
        display: true,
        hints: ''
      }

      const inputConstant0 = {
        name: 'Input Option 1 - Auto-timed Advance',
        type: 'InputField',
        value: '',
        options: null,
        display: true,
        hints: 'ms'
      }

      const inputConstant1 = {
        name: 'Input Option 2 - Key Advance',
        type: 'MultiSelectField',
        value: [],
        options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
          'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
          'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        display: true,
        hints: ''
      }

      const inputConstant2 = {
        name: 'Input Option 3 - Error Feedback - Key Advance',
        type: 'MultiSelectField',
        value: [],
        options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
          'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
          'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        display: true,
        hints: ''
      }

      const inputConstant3 = {
        name: 'Input Option 3 - Error Feedback - Error Key',
        type: 'MultiSelectField',
        value: [],
        options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
          'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
          'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        display: true,
        hints: ''
      }

      const inputConstant4 = {
        name: 'Input Option 3 - Error Feedback - Error Message',
        type: 'InputField',
        value: '',
        options: null,
        display: true,
        hints: ''
      }

      const inputConstant5 = {
        name: 'Input Option 3 - Error Feedback - Allow Correction',
        type: 'SwitchField',
        value: false,
        options: null,
        display: true,
        hints: ''
      }

      const inputConstant6 = {
        name: 'Input Option 4 - Next Button',
        type: 'SwitchField',
        value: false,
        options: null,
        display: true,
        hints: ''
      }

      const inputConstant7 = {
        name: 'Input Option 5 - Text Response',
        type: 'SwitchField',
        value: false,
        options: null,
        display: true,
        hints: ''
      }

      const inputConstant8 = {
        name: 'Input Option 6 - Survey Response',
        type: 'InputField',
        value: '',
        options: null,
        display: true,
        hints: ''
      }

      return (
        <div>
          <Card shadow={1} >
            <CardTitle >
              {trial.id}
              <OpenExperimentButton
                url='http://localhost:3000'
                onExperimentWindowReady={this.postMessage} />
              <IconButton name='control_point_duplicate' colored ripple onClick={handleCopy} />
            </CardTitle>
            <CardActions border>
              {fieldList}
            </CardActions>
            <CardActions border>
              <fields.InputField
                trialId={trial.id}
                fieldConstantKey='note'
                fieldConstant={noteConstant}
                fieldSetting={trial.setting.note || ''}
                onChange={handleChange}
                customStyle={{ width: '180px' }} />
              <fields.InputField
                trialId={trial.id}
                fieldConstantKey='reminder'
                fieldConstant={reminderConstant}
                fieldSetting={trial.setting.reminder || ''}
                onChange={handleChange}
                customStyle={{ width: '250px' }} />
            </CardActions>
            <CardActions border>
              <fields.InputField
                trialId={trial.id}
                fieldConstantKey='inputAutoTimedAdvance'
                fieldConstant={inputConstant0}
                fieldSetting={trial.setting.inputAutoTimedAdvance || ''}
                onChange={handleChange} />
              <fields.MultiSelectListField
                trialId={trial.id}
                fieldConstantKey='inputKeyAdvance'
                fieldConstant={inputConstant1}
                fieldSetting={trial.setting.inputKeyAdvance || []}
                onChange={handleChange} />
              <fields.MultiSelectListField
                trialId={trial.id}
                fieldConstantKey='inputErrorFeedbackKeyAdvance'
                fieldConstant={inputConstant2}
                fieldSetting={trial.setting.inputErrorFeedbackKeyAdvance || []}
                onChange={handleChange} />
              <fields.MultiSelectListField
                trialId={trial.id}
                fieldConstantKey='inputErrorFeedbackErrorKey'
                fieldConstant={inputConstant3}
                fieldSetting={trial.setting.inputErrorFeedbackErrorKey || []}
                onChange={handleChange} />
              <fields.InputField
                trialId={trial.id}
                fieldConstantKey='inputErrorFeedbackMessage'
                fieldConstant={inputConstant4}
                fieldSetting={trial.setting.inputErrorFeedbackMessage || ''}
                onChange={handleChange}
                customStyle={{ width: '250px' }} />
              <fields.SwitchField
                trialId={trial.id}
                fieldConstantKey='inputErrorFeedbackAllowCorrection'
                fieldConstant={inputConstant5}
                fieldSetting={
                         typeof trial.setting.inputErrorFeedbackAllowCorrection === 'undefined'
                         ? false : trial.setting.inputErrorFeedbackAllowCorrection}
                onChange={handleChange} />
              <fields.SwitchField
                trialId={trial.id}
                fieldConstantKey='inputNextButton'
                fieldConstant={inputConstant6}
                fieldSetting={
                         typeof trial.setting.inputNextButton === 'undefined'
                         ? false : trial.setting.inputNextButton}
                onChange={handleChange} />
              <fields.SwitchField
                trialId={trial.id}
                fieldConstantKey='inputTextResponse'
                fieldConstant={inputConstant7}
                fieldSetting={
                         typeof trial.setting.inputTextResponse === 'undefined'
                         ? false : trial.setting.inputTextResponse}
                onChange={handleChange} />
              <fields.InputField
                trialId={trial.id}
                fieldConstantKey='inputSurveyResponse'
                fieldConstant={inputConstant8}
                fieldSetting={trial.setting.inputSurveyResponse ? trial.setting.inputSurveyResponse : ''}
                onChange={handleChange}
                customStyle={{ width: '300px' }} />
            </CardActions>
            <CardActions border>
              <Button name='delete' raised accent ripple onClick={handleDelete}>Delete Trial</Button>
            </CardActions>
          </Card>
        </div>
      )
    } else {
      return (<div />
      )
    }
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SettingPane)
