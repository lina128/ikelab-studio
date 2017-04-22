import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import Badge from 'react-mdl/lib/Badge'
import Thumbnail from './Thumbnail'
import './Trial.scss'

export default class Trial extends PureComponent {
  constructor (props) {
    super(props)
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this)
  }

  static propTypes = {
    moveNode: PropTypes.func,
    moveOutside: PropTypes.func,
    id: PropTypes.number.isRequired,
    screenshot: PropTypes.string,
    branchStyle: PropTypes.string,
    clickTrial: PropTypes.func.isRequired,
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
      screenshot,
      branchStyle } = this.props

    const classnames = classNames('design_trial_branch', branchStyle)

    return connectDropTarget(
      <div className='design_trial_default'>
        {connectDragSource(
          <div>
            <Badge text={id}>
              <div>
                <Thumbnail
                  id={id}
                  screenshot={screenshot}
                  onThumbnailClick={this.handleThumbnailClick} />
              </div>
            </Badge>
          </div>
        )}
        <div className={classnames} />
      </div>
    )
  }
}
