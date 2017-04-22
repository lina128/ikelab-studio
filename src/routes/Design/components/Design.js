import React, { PureComponent, PropTypes } from 'react'
import Ribbon from '../containers/Ribbon'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'
import DesignPaneContainer from '../containers/DesignPaneContainer'
import TrialPaneContainer from '../containers/TrialPaneContainer'
import SettingPane from '../containers/SettingPane'
import './Design.scss'

export default class Design extends PureComponent {
  static propTypes = {
    experimentId: PropTypes.number.isRequired,
    name: PropTypes.string,
    condition: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired,
    currentTrial: PropTypes.number,
    isSaving: PropTypes.bool.isRequired
  }

  render () {
    const { isSaving, currentTrial, structure, entity } = this.props

    const trial = entity[currentTrial] || null

    return (
      <div>
        { isSaving && <div>Saving ...</div> }
        <div className='design_container1'>
          <Ribbon />
          <div className='design_container2'>
            <FirstColumn>
              <DesignPaneContainer structure={structure} />
            </FirstColumn>
            <ThirdColumn>
              <SettingPane id={currentTrial} trial={trial} />
            </ThirdColumn>
            <SecondColumn>
              <TrialPaneContainer id={currentTrial} trial={trial} />
            </SecondColumn>
          </div>
        </div>
      </div>
    )
  }
}
