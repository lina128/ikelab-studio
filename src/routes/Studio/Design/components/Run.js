import React, { PureComponent, PropTypes } from 'react'
import BlockContainer from '../containers/BlockContainer'
import './Run.scss'

export default class Run extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired,
    moveNode: PropTypes.func.isRequired,
    moveInside: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired
  }

  render () {
    const {
      connectDropTarget,
      moveNode,
      moveInside,
      clickTrial,
      id,
      children,
      entity } = this.props

    const name = entity[id].name
    return connectDropTarget(
      <div className='design_run_default'>
        {children.map(c =>
          <BlockContainer
            key={c.id}
            id={c.id}
            children={c.children}
            entity={entity}
            moveNode={moveNode}
            moveInside={moveInside}
            clickTrial={clickTrial} />)}
        <div className={'design_run_decorate'}>
          {name}
        </div>
      </div>
    )
  }
}
