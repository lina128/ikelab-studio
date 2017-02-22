import React, {
  Component,
  PropTypes
} from 'react'
import './SettingPane.scss'
import * as Modules from '../elements/settings'
import * as fields from '../elements/fields'
import {
  Card,
  CardTitle,
  CardActions
} from 'react-mdl/lib/Card'
import Button from 'react-mdl/lib/Button'

export default class SettingPane extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    trial: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  handleClick () {
    const target = window.open(
      'http://localhost:3000',
      'ikelab experiment',
      'width={screen.width}, height={screen.height}')

    const { trial } = this.props

    const receiveMessage = function (event) {
      if (event.origin !== 'http://localhost:3000') {
        return
      }

      if (event.data === 'loaded') {
        target.postMessage(trial, 'http://localhost:3000')
      }
    }

    const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent'
    const eventer = window[eventMethod]
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'
    eventer(messageEvent, receiveMessage)
  }

  render () {
    const {
      trial,
      onChange
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
            onChange={onChange} />)
        }
      }

      return (
        <div className={'design_settingPane_default'} >
          <Card shadow={1} >
            <CardTitle >
              {trial.id}
              <Button raised accent ripple onClick={this.handleClick} > Preview </Button>
            </CardTitle>
            <CardActions border>
              {fieldList}
            </CardActions>
          </Card>
        </div>
      )
    } else {
      return (<div className={'design_settingPane_default'} />
      )
    }
  }
  }
