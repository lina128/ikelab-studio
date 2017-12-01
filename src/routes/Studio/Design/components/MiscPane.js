import React, { PureComponent, PropTypes } from 'react'
import MiscComponent from './MiscComponent'
import MISC from '../Elements/settings/misc'
import './MiscPane.scss'

export default class MiscPane extends PureComponent {
  constructor () {
    super()
    this.buildField = this.buildField.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    trial: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  buildField () {
    const { id, trial, handleChange } = this.props
    const arr = []

    for (let i in MISC) {
      arr.push(<MiscComponent key={i} miscKey={i} misc={MISC[i]} id={id} trial={trial} handleChange={handleChange} />)
    }

    return arr
  }

  render () {
    const fieldList = this.buildField()

    return (
      <div className='design_miscPane_default'>
        {fieldList}
      </div>
    )
  }
}
