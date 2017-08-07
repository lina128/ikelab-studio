import React, { PureComponent, PropTypes } from 'react'
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

  onClick (e) {
    e.stopPropagation()
    this.props.onThumbnailClick()
  }

  render () {
    const { screenshot } = this.props

    return (
      <div onClick={this.onClick || defaultFunc}>
        {screenshot ? <img
          src={screenshot || ''}
          className='design_thumbnail_img' /> : <div className='design_thumbnail_img'></div>}

      </div>
    )
  }
}
