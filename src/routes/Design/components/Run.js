import React, { PureComponent, PropTypes } from 'react'
import IconButton from 'react-mdl/lib/IconButton'
import IconToggle from 'react-mdl/lib/IconToggle'
import BlockContainer from '../containers/BlockContainer'
import './Run.scss'

export default class Run extends PureComponent {
  constructor (props) {
    super(props)
    this.handleChangeRunRandomization = this.handleChangeRunRandomization.bind(this)
    this.handleChangeRunCounterbalance = this.handleChangeRunCounterbalance.bind(this)
    this.handleDeleteNode = this.handleDeleteNode.bind(this)
  }

  static propTypes = {
    selectMode: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    runSetting: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    moveNode: PropTypes.func,
    moveOutside: PropTypes.func,
    moveInside: PropTypes.func,
    changeRunSetting: PropTypes.func,
    deleteNode: PropTypes.func,
    connectDropTarget: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired
  }

  handleChangeRunRandomization () {
    this.props.changeRunSetting(this.props.id, { randomized: !this.props.runSetting.randomized })
  }

  handleChangeRunCounterbalance () {
    this.props.changeRunSetting(this.props.id, { counterbalanced: !this.props.runSetting.counterbalanced })
  }

  handleDeleteNode () {
    this.props.deleteNode(this.props.id)
  }

  render () {
    const {
      connectDropTarget,
      name,
      runSetting,
      children,
      moveNode,
      moveOutside,
      moveInside,
      deleteNode,
      clickTrial } = this.props

    const runBlocks = []

    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        runBlocks.push(
          <BlockContainer
            key={children[i].id}
            id={children[i].id}
            name={children[i].name}
            blockSetting={children[i].blockSetting}
            branchStyle={'design_block_branch_single'}
            children={children[i].children}
            moveNode={moveNode}
            moveOutside={moveOutside}
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
              name={children[i].name}
              blockSetting={children[i].blockSetting}
              branchStyle={'design_block_branch_top'}
              children={children[i].children}
              moveNode={moveNode}
              moveOutside={moveOutside}
              moveInside={moveInside}
              deleteNode={deleteNode}
              clickTrial={clickTrial} />
          )
        } else if (i === children.length - 1) {
          runBlocks.push(
            <BlockContainer
              key={children[i].id}
              id={children[i].id}
              name={children[i].name}
              blockSetting={children[i].blockSetting}
              branchStyle={'design_block_branch_bottom'}
              children={children[i].children}
              moveNode={moveNode}
              moveOutside={moveOutside}
              moveInside={moveInside}
              deleteNode={deleteNode}
              clickTrial={clickTrial} />
          )
        } else {
          runBlocks.push(
            <BlockContainer
              key={children[i].id}
              id={children[i].id}
              name={children[i].name}
              blockSetting={children[i].blockSetting}
              branchStyle={'design_block_branch_middle'}
              children={children[i].children}
              moveNode={moveNode}
              moveOutside={moveOutside}
              moveInside={moveInside}
              deleteNode={deleteNode}
              clickTrial={clickTrial} />
          )
        }
      }
    }

    return connectDropTarget(
      <div className='design_run_default'>
        {runBlocks}
        <div className={'design_run_decorate'}>
          {name}
          <div className={'design_run_verticalDecoration'}>
            <IconToggle
              name='autorenew'
              ripple
              checked={runSetting.randomized}
              onChange={this.handleChangeRunRandomization} />
            <IconToggle name='A/B' ripple checked={runSetting.counterbalanced}
              onChange={this.handleChangeRunCounterbalance} />
            <IconButton name='delete' accent ripple onClick={this.handleDeleteNode} />
          </div>
        </div>
      </div>
    )
  }
}