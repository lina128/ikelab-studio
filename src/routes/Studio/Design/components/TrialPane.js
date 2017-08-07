import React, { PureComponent, PropTypes } from 'react'
import { Card } from 'react-mdl/lib/Card'
import * as frames from '../elements/frames'
import './TrialPane.scss'

export default class TrialPane extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    trial: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  render () {
    const { id, trial, handleChange } = this.props

    const MyComponent = frames[trial.type] || frames['DEFAULTDISPLAY']

    return (
      <Card id='ikelab_trialPane' shadow={6} className='design_trialPane_default'>
        <MyComponent
          style={{ width: '100%', height: '100%' }}
          id={id}
          trial={trial}
          onChange={handleChange} />
      </Card>
    )
  }
}
