import React, { PureComponent, PropTypes } from 'react'
import { Card } from 'react-mdl/lib/Card'
import * as frames from '../elements/frames'
import './TrialPane.scss'

export default class TrialPane extends PureComponent {
  constructor (props) {
    super(props)
    this.trialWrapper = null
  }

  static propTypes = {
    id: PropTypes.number,
    trial: PropTypes.object,
    handleChange: PropTypes.func.isRequired
  }

  render () {
    const { id, trial, handleChange } = this.props

    if (trial) {
      const MyComponent = frames[trial.type] || frames['DEFAULTDISPLAY']

      return (
        <Card id='ikelab_trialPane' shadow={6} className='design_trialPane_default'>
          <MyComponent
            ref={(c) => (this.trialWrapper = c)}
            style={{ width: '100%', height: '100%' }}
            id={id}
            trial={trial}
            onChange={handleChange} />
        </Card>
      )
    } else {
      return (
        <Card id='ikelab_trialPane' shadow={6} className='design_trialPane_default' />
      )
    }
  }
}
