import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { moveNode, moveOutside, moveInside, clickTrial, selectTrial } from '../modules/design'
import Trial from './Trial'
import Block from './Block'
import Run from './Run'
import './DesignPane.scss'

const mapStateToProps = (state) => {
  return {
    selectMode: state.design.present.selectMode,
    structure: state.design.present.structure
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
    onSelectTrial: PropTypes.func.isRequired
  }

  render () {
    const { selectMode, structure, onNodeMove, onMoveOutside, onMoveInside, onClickTrial, onSelectTrial } = this.props

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
                children={x.children}
                clickTrial={onSelectTrial} />
            }
            if (x.level === 'run') {
              return <Run
                key={x.id}
                selectMode={selectMode}
                id={x.id} color={x.color}
                name={x.name}
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
                children={x.children}
                moveNode={onNodeMove}
                moveOutside={onMoveOutside}
                moveInside={onMoveInside}
                clickTrial={onClickTrial} />
            }
            if (x.level === 'run') {
              return <Run
                key={x.id}
                selectMode={selectMode}
                id={x.id}
                color={x.color}
                name={x.name}
                children={x.children}
                moveNode={onNodeMove}
                moveOutside={onMoveOutside}
                moveInside={onMoveInside}
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
