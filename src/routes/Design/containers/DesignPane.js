import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  moveNode, moveOutside, moveInside, clickTrial,
  deleteNode, selectTrial, changeBlockSetting, changeRunSetting
} from '../modules/design'
import Trial from './Trial'
import Block from './Block'
import Run from './Run'
import './DesignPane.scss'

const mapStateToProps = (state) => {
  return {
    selectMode: state.design.present.selectMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNodeMove: (id, afterId, direction) => {
      dispatch(moveNode(id, afterId, direction))
    },
    onMoveOutside: (id) => {
      dispatch(moveOutside(id))
    },
    onMoveInside: (id, parentId) => {
      dispatch(moveInside(id, parentId))
    },
    onClickTrial: (id) => {
      dispatch(clickTrial(id))
    },
    onSelectTrial: (id) => {
      dispatch(selectTrial(id))
    },
    onChangeBlockSetting: (id, setting) => {
      dispatch(changeBlockSetting(id, setting))
    },
    onChangeRunSetting: (id, setting) => {
      dispatch(changeRunSetting(id, setting))
    },
    onDeleteNode: (id) => {
      dispatch(deleteNode(id))
    }
  }
}

export class DesignPane extends Component {
  static propTypes = {
    selectMode: PropTypes.bool.isRequired,
    structure: PropTypes.array.isRequired,
    onNodeMove: PropTypes.func.isRequired,
    onMoveOutside: PropTypes.func.isRequired,
    onMoveInside: PropTypes.func.isRequired,
    onClickTrial: PropTypes.func.isRequired,
    onSelectTrial: PropTypes.func.isRequired,
    onChangeBlockSetting: PropTypes.func.isRequired,
    onChangeRunSetting: PropTypes.func.isRequired,
    onDeleteNode: PropTypes.func.isRequired
  }

  handleDialogOpen (id) {
    this.setState({ dialogOpen: true, id: id })
  }

  handleDialogClose () {
    this.setState({ dialogOpen: false })
  }

  render () {
    const { selectMode, structure, onNodeMove, onMoveOutside,
           onMoveInside, onClickTrial, onSelectTrial,
           onChangeBlockSetting, onChangeRunSetting,
           onDeleteNode } = this.props

    if (selectMode) {
      return (
        <div className={'design_designPane_default'}>
          {
          structure.map(x => {
            if (x.level === 'trial') {
              return <Trial
                key={x.id}
                selectMode={selectMode}
                id={x.id}
                screenshot={x.screenshot}
                selected={x.selected}
                condition={x.condition}
                clickTrial={onSelectTrial} />
            }
            if (x.level === 'block') {
              return <Block
                key={x.id}
                selectMode={selectMode}
                id={x.id} color={x.color}
                name={x.name}
                blockSetting={x.blockSetting}
                children={x.children}
                clickTrial={onSelectTrial} />
            }
            if (x.level === 'run') {
              return <Run
                key={x.id}
                selectMode={selectMode}
                id={x.id}
                name={x.name}
                runSetting={x.runSetting}
                children={x.children}
                clickTrial={onSelectTrial} />
            }
          })
        }
        </div>
      )
    } else {
      return (
        <div className={'design_designPane_default'}>
          {
          structure.map(x => {
            if (x.level === 'trial') {
              return <Trial
                key={x.id}
                selectMode={selectMode}
                id={x.id}
                screenshot={x.screenshot}
                selected={x.selected}
                condition={x.condition}
                moveNode={onNodeMove}
                moveOutside={onMoveOutside}
                clickTrial={onClickTrial} />
            }
            if (x.level === 'block') {
              return <Block
                key={x.id}
                selectMode={selectMode}
                id={x.id}
                color={x.color}
                name={x.name}
                blockSetting={x.blockSetting}
                children={x.children}
                moveNode={onNodeMove}
                moveOutside={onMoveOutside}
                moveInside={onMoveInside}
                changeBlockSetting={onChangeBlockSetting}
                deleteNode={onDeleteNode}
                clickTrial={onClickTrial} />
            }
            if (x.level === 'run') {
              return <Run
                key={x.id}
                selectMode={selectMode}
                id={x.id}
                name={x.name}
                runSetting={x.runSetting}
                children={x.children}
                moveNode={onNodeMove}
                moveOutside={onMoveOutside}
                moveInside={onMoveInside}
                changeBlockSetting={onChangeBlockSetting}
                changeRunSetting={onChangeRunSetting}
                deleteNode={onDeleteNode}
                clickTrial={onClickTrial} />
            }
          })
        }
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignPane)
