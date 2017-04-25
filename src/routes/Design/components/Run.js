import React, { PureComponent, PropTypes } from 'react'
import BlockContainer from '../containers/BlockContainer'
import './Run.scss'

export default class Run extends PureComponent {
  constructor (props) {
    super(props)
    this.handleChangeRunRandomization = this.handleChangeRunRandomization.bind(this)
    this.handleChangeRunCounterbalance = this.handleChangeRunCounterbalance.bind(this)
    this.handleDeleteNode = this.handleDeleteNode.bind(this)
    this.renderRunBlocks = this.renderRunBlocks.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired,
    moveNode: PropTypes.func,
    moveInside: PropTypes.func,
    changeSetting: PropTypes.func,
    deleteNode: PropTypes.func,
    connectDropTarget: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired
  }

  handleChangeRunRandomization () {
    const { id, entity } = this.props
    this.props.changeSetting(id, { randomized: !entity[id].setting.randomized })
  }

  handleChangeRunCounterbalance () {
    const { id, entity } = this.props
    this.props.changeSetting(id, { counterbalanced: !entity[id].setting.counterbalanced })
  }

  handleDeleteNode () {
    this.props.deleteNode(this.props.id)
  }

  renderRunBlocks () {
    const { entity, children, moveNode, moveInside, deleteNode, clickTrial } = this.props
    const runBlocks = []
    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        runBlocks.push(
          <BlockContainer
            key={children[i].id}
            id={children[i].id}
            branchStyle={'design_block_branch_single'}
            children={children[i].children}
            entity={entity}
            moveNode={moveNode}
            moveInside={moveInside}
            deleteNode={deleteNode}
            clickTrial={clickTrial} />
        )
      } else {
        if (i === 0) {
          runBlocks.push(
            <BlockContainer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_block_branch_top'}
              children={children[i].children}
              entity={entity}
              moveNode={moveNode}
              moveInside={moveInside}
              deleteNode={deleteNode}
              clickTrial={clickTrial} />
          )
        } else if (i === children.length - 1) {
          runBlocks.push(
            <BlockContainer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_block_branch_bottom'}
              children={children[i].children}
              entity={entity}
              moveNode={moveNode}
              moveInside={moveInside}
              deleteNode={deleteNode}
              clickTrial={clickTrial} />
          )
        } else {
          runBlocks.push(
            <BlockContainer
              key={children[i].id}
              id={children[i].id}
              branchStyle={'design_block_branch_middle'}
              children={children[i].children}
              entity={entity}
              moveNode={moveNode}
              moveInside={moveInside}
              deleteNode={deleteNode}
              clickTrial={clickTrial} />
          )
        }
      }
    }

    return runBlocks
  }

  render () {
    const {
      connectDropTarget,
      id,
      entity } = this.props

    const runBlocks = this.renderRunBlocks()

    const name = entity[id].name
    return connectDropTarget(
      <div className='design_run_default'>
        {runBlocks}
        <div className={'design_run_decorate'}>
          {name}
        </div>
      </div>
    )
  }
}
