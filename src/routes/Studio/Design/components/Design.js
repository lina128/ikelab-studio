import React, { PureComponent, PropTypes } from 'react'
import Toolbar from './Toolbar'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'
import Titlebar from './Titlebar'
import PrimaryTools from '../containers/PrimaryTools'
import TrialTools from '../containers/TrialTools'
import ConditionTools from '../containers/ConditionTools'
import DesignPaneContainer from '../containers/DesignPaneContainer'
import TrialPaneContainer from '../containers/TrialPaneContainer'
import SettingPane from '../containers/SettingPane'
import '../../../../styles/core.scss'

const DEFAULT_NAME = ''
const DEFAULT_TRIAL = null

export default class Design extends PureComponent {
  static propTypes = {
    experiment: PropTypes.object.isRequired
  }

  render () {
    const { experiment } = this.props

    const trial = experiment.entity[experiment.currentTrial] || DEFAULT_TRIAL

    return (
      <div className='wrapper'>
        <Toolbar>
          <PrimaryTools />
        </Toolbar>
        <Toolbar>
          <ConditionTools experiment={experiment} />
          {trial ? <TrialTools id={experiment.currentTrial} trial={trial} /> : null}
        </Toolbar>
        <div className='wrapper' style={{ height: '700px' }}>
          <FirstColumn>
            {experiment ? <DesignPaneContainer experiment={experiment} /> : null}
          </FirstColumn>
          <ThirdColumn>
          </ThirdColumn>
          <SecondColumn>
            <Titlebar expName={experiment ? experiment.name : DEFAULT_NAME} unitName={trial ? trial.name : DEFAULT_TRIAL} />
            {trial && trial.type !== 'BLOCK' && trial.type !== 'RUN' ? <TrialPaneContainer id={experiment.currentTrial} trial={trial} /> : null}
          </SecondColumn>
        </div>
      </div>
    )
  }
}

      /*
                <Ribbon />
      <div className='design_container2'>
            <FirstColumn>
              <DesignPaneContainer experiment={experiment} />
            </FirstColumn>
            <ThirdColumn>
              <SettingPane id={currentTrial} trial={trial} />
            </ThirdColumn>
            <SecondColumn>
              <TrialPaneContainer id={currentTrial} trial={trial} />
            </SecondColumn>
          </div>
          */
