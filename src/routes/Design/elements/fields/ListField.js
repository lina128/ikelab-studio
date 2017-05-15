import React, { PureComponent, PropTypes } from 'react'
import Menu from 'react-mdl-extra/lib/Menu'
import MenuItem from 'react-mdl-extra/lib/MenuItem'
import Button from 'react-mdl/lib/Button'

export default class ListField extends PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.renderOption = this.renderOption.bind(this)
  }

  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleClick (option) {
    const { onChange, trialId, fieldConstantKey } = this.props
    onChange(trialId, { [fieldConstantKey]: option })
  }

  renderOption (option, ind, arr) {
    return (
      <MenuItem key={ind} onClick={() => this.handleClick(option)}>{option}</MenuItem>
    )
  }

  render () {
    const { fieldConstant, fieldSetting } = this.props

    const btn = (<Button style={{ width: '124px' }} raised colored ripple>
      {fieldSetting}
    </Button>)

    return (
      <div>
        {fieldConstant.name}:
        <Menu target={btn} align={'tl bl'}>
          {fieldConstant.options.map(this.renderOption)}
        </Menu>
        {fieldConstant.hints}
      </div>
    )
  }
}
