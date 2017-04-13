import React, { PureComponent, PropTypes } from 'react'
import { DIMENSIONS } from '../constants'
import './Thumbnail.scss'

const defaultFunc = () => {}

export default class Thumbnail extends PureComponent {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  static propTypes = {
    screenshot: PropTypes.string,
    onThumbnailClick: PropTypes.func
  }

  onClick () {
    this.props.onThumbnailClick()
  }

  render () {
    const { screenshot } = this.props

    return (
      <div className={'design_thumbnail_default'} onClick={this.onClick || defaultFunc}>
        <img
          src={screenshot}
          style={{ height:DIMENSIONS.TRIALHEIGHT + 'px', width:DIMENSIONS.TRIALWIDTH + 'px' }} />
      </div>
    )
  }
}
