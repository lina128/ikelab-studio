import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Badge from 'react-mdl/lib/Badge'
import Thumbnail from '../components/Thumbnail'
import Sidebar from '../components/Sidebar'
import Infobar from '../components/Infobar'
import HorizontalBar from '../components/HorizontalBar'
import './TrialRenderer.scss'

export default class TrialRenderer extends Component {
  static propTypes = {
    condition: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    screenshot: PropTypes.string,
    branchStyle: PropTypes.string,
    setting: PropTypes.object.isRequired
  }

  render () {
    const {
      condition,
      id,
      screenshot,
      branchStyle,
      setting } = this.props

    const conditionList = []

    for (let i = 0; i < condition.length; i++) {
      conditionList.push(
        <HorizontalBar key={condition[i]} backgroundColor={condition[i]} />
      )
    }

    const classnames = classNames('design_trialRenderer_branch', branchStyle)

    let input

    if (setting.inputAutoTimedAdvance) {
      input = setting.inputAutoTimedAdvance + 'ms'
    } else if (setting.inputKeyAdvance && setting.inputKeyAdvance.length > 0) {
      input = setting.inputKeyAdvance.join(' ')
    } else if (setting.inputErrorFeedbackKeyAdvance &&
               setting.inputErrorFeedbackErrorKey &&
               setting.inputErrorFeedbackKeyAdvance.length > 0 &&
               setting.inputErrorFeedbackErrorKey.length > 0) {
      input = 'Correct Keys: ' +
        setting.inputErrorFeedbackKeyAdvance.join(' ') +
        ', Incorrect Keys: ' +
        setting.inputErrorFeedbackErrorKey.join(' ') +
        ', Feedback Message: ' +
        setting.inputErrorFeedbackMessage +
        ', Allow Correction: ' +
        setting.inputErrorFeedbackAllowCorrection
    } else if (setting.inputNextButton) {
      input = 'Next Button'
    } else if (setting.inputTextResponse) {
      input = 'Text Response'
    } else if (setting.inputSurveyResponse) {
      input = 'Survey Response: ' + setting.inputSurveyResponse
    }

    return (
      <div className='design_trialRenderer_wrapper'>
        <div className='design_trialRenderer_default'>
          <Badge text={id}>
            <div>
              <Thumbnail
                id={id}
                screenshot={screenshot}
                condition={condition} />
            </div>
          </Badge>
          <Sidebar>
            {conditionList}
          </Sidebar>
          <div className={classnames} />
        </div>
        <Infobar>
          <span style={{ fontStyle:'italic' }}>{setting.note}</span>
          <br />
          <span>{input}</span>
        </Infobar>
      </div>
    )
  }
}
