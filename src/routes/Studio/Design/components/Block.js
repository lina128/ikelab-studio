import React, { PureComponent, PropTypes } from 'react'
import TrialContainer from '../containers/TrialContainer'
import './Block.scss'

export default class Block extends PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveNode: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  }

  handleClick (e) {
    e.stopPropagation()
    this.props.clickTrial(this.props.id)
  }

  render () {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      clickTrial,
      moveNode,
      children,
      entity } = this.props

    const opacity = isDragging ? 0 : 1

    return connectDropTarget(
      <div className={'design_block_default'} onClick={this.handleClick}>
        {connectDragSource(
          <div className={'design_block_inner'} style={{ opacity }}>
            {children.map(c =>
              (<TrialContainer
                key={c.id}
                id={c.id}
                entity={entity}
                clickTrial={clickTrial}
                moveNode={moveNode} />))
            }
          </div>
        )}
      </div>
    )
  }
}
