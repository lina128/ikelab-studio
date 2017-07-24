import React, { PureComponent, PropTypes } from 'react'
import './HorizontalBar.scss'

const defaultStyle = {}

export default class HorizontalBar extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string
  }

  render () {
    const customStyle = this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor } : defaultStyle

    return (
      <div
        className={'design_horizontalBar_default'}
        style={customStyle} />
    )
  }
}
