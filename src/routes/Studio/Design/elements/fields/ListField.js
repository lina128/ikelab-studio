import React, { PureComponent, PropTypes } from 'react'
import Menu from 'react-mdl-extra/lib/Menu'
import MenuItem from 'react-mdl-extra/lib/MenuItem'
import Button from 'react-mdl/lib/Button'
import './field.scss'

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

    const btn = (<Button className='design_field_inner_button'>
      {fieldSetting}
    </Button>)

    return (
      <div className='design_field_default'>
        <div className='design_field_field'>{fieldConstant.name}</div>
        <div className='design_field_field'>
          <Menu target={btn} align={'tl bl'}>
            {fieldConstant.options.map(this.renderOption)}
          </Menu>
          {fieldConstant.hints}
        </div>
      </div>
    )
  }
}
