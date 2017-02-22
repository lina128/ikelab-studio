import React, { PropTypes, Component } from 'react'
import { ITEMTYPES } from '../constants'
import { DropTarget } from 'react-dnd'
import Block from './Block'
import './Run.scss'

const runTarget = {
  hover (props, monitor, component) {
    if (monitor.getItem().level === 'block' && props.children.length === 0) {
      props.moveInside(monitor.getItem().id, props.id)
    }
  }
}

function collectTarget (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export class Run extends Component {
  static propTypes = {
    selectMode: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    moveNode: PropTypes.func,
    moveOutside: PropTypes.func,
    moveInside: PropTypes.func,
    connectDropTarget: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired
  }

  render () {
    const {
      connectDropTarget,
      selectMode,
      name,
      children,
      moveNode,
      moveOutside,
      moveInside,
      clickTrial } = this.props

    const runBlocks = []

    for (let i = 0; i < children.length; i++) {
      if (children.length === 1) {
        runBlocks.push(
          <Block
            key={children[i].id}
            selectMode={selectMode}
            id={children[i].id}
            name={children[i].name}
            branchStyle={'design_block_branch_single'}
            children={children[i].children}
            moveNode={moveNode}
            moveOutside={moveOutside}
            moveInside={moveInside}
            clickTrial={clickTrial} />
        )
      } else {
        if (i === 0) {
          runBlocks.push(
            <Block
              key={children[i].id}
              selectMode={selectMode}
              id={children[i].id}
              name={children[i].name}
              branchStyle={'design_block_branch_top'}
              children={children[i].children}
              moveNode={moveNode}
              moveOutside={moveOutside}
              moveInside={moveInside}
              clickTrial={clickTrial} />
          )
        } else if (i === children.length - 1) {
          runBlocks.push(
            <Block
              key={children[i].id}
              selectMode={selectMode}
              id={children[i].id}
              name={children[i].name}
              branchStyle={'design_block_branch_bottom'}
              children={children[i].children}
              moveNode={moveNode}
              moveOutside={moveOutside}
              moveInside={moveInside}
              clickTrial={clickTrial} />
          )
        } else {
          runBlocks.push(
            <Block
              key={children[i].id}
              selectMode={selectMode}
              id={children[i].id}
              name={children[i].name}
              branchStyle={'design_block_branch_middle'}
              children={children[i].children}
              moveNode={moveNode}
              moveOutside={moveOutside}
              moveInside={moveInside}
              clickTrial={clickTrial} />
          )
        }
      }
    }

    if (selectMode) {
      return (
        <div className={'design_run_default'}>
          {runBlocks}
          <div style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            fontSize: '12pt',
            fontFamily: 'Helvetica'
          }}>
            {name}
          </div>
        </div>
      )
    } else {
      return connectDropTarget(
        <div className={'design_run_default'}>
          {runBlocks}
          <div style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            fontSize: '12pt',
            fontFamily: 'Helvetica'
          }}>
            {name}
          </div>
        </div>
      )
    }
  }
}

export default DropTarget(ITEMTYPES.BLOCK, runTarget, collectTarget)(Run)
