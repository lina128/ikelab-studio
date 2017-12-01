import React, { PureComponent, PropTypes } from 'react'
import Toolbar from './Toolbar'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'
import Titlebar from './Titlebar'
import PrimaryTools from '../containers/PrimaryTools'
import TrialToolsContainer from '../containers/TrialToolsContainer'
import TrialToolsVerticalContainer from '../containers/TrialToolsVerticalContainer'
import ConditionToolsContainer from '../containers/ConditionToolsContainer'
import DesignPaneContainer from '../containers/DesignPaneContainer'
import TrialPaneContainer from '../containers/TrialPaneContainer'
import MiscPaneContainer from '../containers/MiscPaneContainer'
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
          <ConditionToolsContainer experiment={experiment} />
          {trial ? <TrialToolsContainer id={experiment.currentTrial} trial={trial} /> : null}
        </Toolbar>
        <div className='wrapper' style={{ height: '700px' }}>
          <FirstColumn>
            {experiment ? <DesignPaneContainer experiment={experiment} /> : null}
          </FirstColumn>
          <ThirdColumn>
            {trial ? <TrialToolsVerticalContainer id={experiment.currentTrial} trial={trial} /> : null}
          </ThirdColumn>
          <SecondColumn>
            <Titlebar expName={experiment
              ? experiment.name : DEFAULT_NAME}
              unitName={trial ? trial.name : DEFAULT_TRIAL} />
            {trial && trial.type !== 'BLOCK' && trial.type !== 'RUN'
              ? <div className='wrapper'><TrialPaneContainer
                id={experiment.currentTrial} trial={trial} />
                <MiscPaneContainer id={experiment.currentTrial} trial={trial} /></div> : null}
          </SecondColumn>
        </div>
      </div>
    )
  }
}
