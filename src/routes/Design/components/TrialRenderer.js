import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import Badge from 'react-mdl/lib/Badge'
import Thumbnail from './Thumbnail'
import Sidebar from './Sidebar'
import Infobar from './Infobar'
import HorizontalBar from './HorizontalBar'
import './TrialRenderer.scss'

const defaultArr = []

export default class TrialRenderer extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    branchStyle: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired
  }

  render () {
    const {
      id,
      branchStyle,
      entity } = this.props

    const condition = entity[id].condition
    let conditionList = []

    for (let id in condition) {
      conditionList.push(
        <HorizontalBar key={id} backgroundColor={condition[id].color} />
      )
    }

    const classnames = classNames('design_trialRenderer_branch', branchStyle)

    const setting = entity[id].setting
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

    if (conditionList.length === 0) {
      conditionList = defaultArr
    }

    const screenshot = entity[id].screenshot
    return (
      <div className='design_trialRenderer_wrapper'>
        <div className='design_trialRenderer_default'>
          <Badge text={id}>
            <div>
              <Thumbnail
                id={id}
                screenshot={screenshot} />
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
