import React, {
  Component,
  PropTypes
} from 'react'
import { connect } from 'react-redux'
import { changeTrialSetting, copyCurrentTrial, deleteCurrentTrial } from '../modules/design'
import * as Modules from '../elements/settings'
import * as fields from '../elements/fields'
import {
  Card,
  CardTitle,
  CardActions
} from 'react-mdl/lib/Card'
import OpenExperimentButton from './OpenExperimentButton'
import IconButton from 'react-mdl/lib/IconButton'
import Button from 'react-mdl/lib/Button'

const mapStateToProps = (state) => {
  return {
    trial: state.design.present.entity[state.design.present.currentTrial],
    id: state.design.present.currentTrial
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id, change) => {
      dispatch(changeTrialSetting(id, change))
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
    id: PropTypes.number,
    trial: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleCopy: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  postMessage (target, event) {
    if (event.origin === 'http://localhost:3000' && event.data === 'loaded') {
      let { trial, id } = this.props
      target.postMessage({
        structure: [
          {
            id: id
          }
        ],
        entity: [
          trial
        ]
      }, 'http://localhost:3000')
    }
  }

  render () {
    const {
      id,
      trial,
      handleChange,
      handleCopy,
      handleDelete
    } = this.props

    if (trial) {
      const fieldConstant = Modules[trial.type]
      const fieldSetting = trial.trialSetting

      let Field
      let fieldList = []

      for (let s in fieldConstant) {
        if (fieldConstant[s].display) {
          Field = fields[fieldConstant[s].type] || fields['DefaultField']
          fieldList.push(<Field
            key={s}
            trialId={id}
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
              {id}
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
                trialId={id}
                fieldConstantKey='note'
                fieldConstant={noteConstant}
                fieldSetting={trial.trialSetting.note || ''}
                onChange={handleChange}
                customStyle={{ width: '180px' }} />
              <fields.InputField
                trialId={id}
                fieldConstantKey='reminder'
                fieldConstant={reminderConstant}
                fieldSetting={trial.trialSetting.reminder || ''}
                onChange={handleChange}
                customStyle={{ width: '250px' }} />
            </CardActions>
            <CardActions border>
              <fields.InputField
                trialId={id}
                fieldConstantKey='inputAutoTimedAdvance'
                fieldConstant={inputConstant0}
                fieldSetting={trial.trialSetting.inputAutoTimedAdvance || ''}
                onChange={handleChange} />
              <fields.MultiSelectListField
                trialId={id}
                fieldConstantKey='inputKeyAdvance'
                fieldConstant={inputConstant1}
                fieldSetting={trial.trialSetting.inputKeyAdvance || []}
                onChange={handleChange} />
              <fields.MultiSelectListField
                trialId={id}
                fieldConstantKey='inputErrorFeedbackKeyAdvance'
                fieldConstant={inputConstant2}
                fieldSetting={trial.trialSetting.inputErrorFeedbackKeyAdvance || []}
                onChange={handleChange} />
              <fields.MultiSelectListField
                trialId={id}
                fieldConstantKey='inputErrorFeedbackErrorKey'
                fieldConstant={inputConstant3}
                fieldSetting={trial.trialSetting.inputErrorFeedbackErrorKey || []}
                onChange={handleChange} />
              <fields.InputField
                trialId={id}
                fieldConstantKey='inputErrorFeedbackMessage'
                fieldConstant={inputConstant4}
                fieldSetting={trial.trialSetting.inputErrorFeedbackMessage || ''}
                onChange={handleChange}
                customStyle={{ width: '250px' }} />
              <fields.SwitchField
                trialId={id}
                fieldConstantKey='inputErrorFeedbackAllowCorrection'
                fieldConstant={inputConstant5}
                fieldSetting={
                         typeof trial.trialSetting.inputErrorFeedbackAllowCorrection === 'undefined'
                         ? false : trial.trialSetting.inputErrorFeedbackAllowCorrection}
                onChange={handleChange} />
              <fields.SwitchField
                trialId={id}
                fieldConstantKey='inputNextButton'
                fieldConstant={inputConstant6}
                fieldSetting={
                         typeof trial.trialSetting.inputNextButton === 'undefined'
                         ? false : trial.trialSetting.inputNextButton}
                onChange={handleChange} />
              <fields.SwitchField
                trialId={id}
                fieldConstantKey='inputTextResponse'
                fieldConstant={inputConstant7}
                fieldSetting={
                         typeof trial.trialSetting.inputTextResponse === 'undefined'
                         ? false : trial.trialSetting.inputTextResponse}
                onChange={handleChange} />
              <fields.InputField
                trialId={id}
                fieldConstantKey='inputSurveyResponse'
                fieldConstant={inputConstant8}
                fieldSetting={trial.trialSetting.inputSurveyResponse ? trial.trialSetting.inputSurveyResponse : ''}
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
