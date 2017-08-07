import React, { Component, PropTypes } from 'react'
import Thumbnail from './Thumbnail'
import './Trial.scss'

export default class Trial extends Component {
  constructor (props) {
    super(props)
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    entity: PropTypes.object.isRequired,
    clickTrial: PropTypes.func.isRequired,
    moveNode: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.id !== this.props.id ||
        nextProps.entity[nextProps.id] !== this.props.entity[this.props.id]) {
      return true
    } else {
      return false
    }
  }

  handleThumbnailClick () {
    this.props.clickTrial(this.props.id)
  }

  renderOverlay () {
    return (
      <div className={'design_trial_overlay'} />
    )
  }

  render () {
    const {
      connectDragSource,
      connectDropTarget,
      id,
      entity } = this.props

    return connectDropTarget(
      <div className='design_trial_default'>
        {connectDragSource(
          <div className='design_trial_dragger'>
            <Thumbnail
            id={id}
            screenshot={entity[id].screenshot}
            onThumbnailClick={this.handleThumbnailClick} />
          </div>
        )}
      </div>
    )
  }
}
