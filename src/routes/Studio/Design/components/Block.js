import React, { PureComponent, PropTypes } from 'react'
import TrialContainer from '../containers/TrialContainer'
import './Block.scss'

export default class Block extends PureComponent {
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

  render () {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      clickTrial,
      moveNode,
      id,
      children,
      entity } = this.props

    const opacity = isDragging ? 0 : 1
    const name = entity[id].name

    return connectDropTarget(
      <div className={'design_block_default'}>
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
            <div className={'design_block_decorate'}>
              {name}
            </div>
          </div>
        )}
      </div>
    )
  }
}
