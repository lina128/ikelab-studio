import React, { Component, PropTypes } from 'react'
import { DIMENSIONS } from '../constants'
import './Thumbnail.scss'

export default class Thumbnail extends Component {
  constructor (props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  static propTypes = {
    screenshot: PropTypes.string,
    onThumbnailClick: PropTypes.func.isRequired
  }

  _onClick () {
    this.props.onThumbnailClick()
  }

  render () {
    const { screenshot } = this.props

    return (
      <div className={'design_thumbnail_default'} onClick={this._onClick}>
        <img src={screenshot} style={{ height:DIMENSIONS.TRIALHEIGHT + 'px', width:DIMENSIONS.TRIALWIDTH + 'px' }} />
      </div>
    )
  }
}
