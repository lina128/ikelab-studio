import React, { PureComponent, PropTypes } from 'react'
import Thumbnail from './Thumbnail'
import './Trial.scss'

export default class Trial extends PureComponent {
  constructor (props) {
    super(props)
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this)
  }

  static propTypes = {
    currentTrial: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    entity: PropTypes.object.isRequired,
    clickTrial: PropTypes.func.isRequired,
    moveNode: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
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
      currentTrial,
      entity } = this.props
    return connectDropTarget(
      <div className={currentTrial === id
      ? 'design_trial_highlight' : 'design_trial_default'}>
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
