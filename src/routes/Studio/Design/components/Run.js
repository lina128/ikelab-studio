import React, { PureComponent, PropTypes } from 'react'
import BlockContainer from '../containers/BlockContainer'
import './Run.scss'

export default class Run extends PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired,
    currentTrial: PropTypes.number.isRequired,
    entity: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveNode: PropTypes.func.isRequired,
    moveInside: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired
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
      moveNode,
      moveInside,
      clickTrial,
      children,
      id,
      currentTrial,
      entity } = this.props

    const opacity = isDragging ? 0 : 1

    return connectDropTarget(
      <div className={currentTrial === id
      ? 'design_run_highlight' : 'design_run_default'} onClick={this.handleClick}>
        {connectDragSource(
          <div className={'design_run_inner'} style={{ opacity }}>
            {children.map(c =>
              <BlockContainer
                key={c.id}
                id={c.id}
                children={c.children}
                currentTrial={currentTrial}
                entity={entity}
                moveNode={moveNode}
                moveInside={moveInside}
                clickTrial={clickTrial} />)}
          </div>
        )}
      </div>
    )
  }
}
