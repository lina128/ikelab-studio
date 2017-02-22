import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { ActionCreators } from 'redux-undo'
import { addTrial, addBlock, addRun, addCondition } from '../modules/design'
import AddButton from '../components/AddButton'
import Trash from './Trash'
import ModuleLoader from './ModuleLoader'
import Button from 'react-mdl/lib/Button'
import './Ribbon.scss'

const getPastSteps = (state) => state.design.past.length
const getFutureSteps = (state) => state.design.future.length

const getPastMemoized = createSelector(
  [ getPastSteps ],
  (pastSteps) => pastSteps > 0
)

const getFutureMemoized = createSelector(
  [ getFutureSteps ],
  (futureSteps) => futureSteps > 0
)

const mapStateToProps = (state) => {
  return {
    pastSteps: getPastMemoized(state),
    futureSteps: getFutureMemoized(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTrial: () => {
      dispatch(addTrial())
    },
    addBlock: () => {
      dispatch(addBlock())
    },
    addRun: () => {
      dispatch(addRun())
    },
    addCondition: () => {
      dispatch(addCondition())
    },
    undo: () => {
      dispatch(ActionCreators.undo())
    },
    redo: () => {
      dispatch(ActionCreators.redo())
    }
  }
}

export class Ribbon extends Component {
  static propTypes = {
    addRun: PropTypes.func.isRequired,
    addCondition: PropTypes.func.isRequired,
    undo: PropTypes.func,
    redo: PropTypes.func,
    pastSteps: PropTypes.bool,
    futureSteps: PropTypes.bool
  }

  render () {
    const { addRun, addCondition, undo, redo, pastSteps, futureSteps } = this.props

    return (
      <div className={'design_ribbon_default'}>
        <div>
          <ModuleLoader />
          <AddButton clickHandler={addRun} text={'Add Run'} />
          <AddButton clickHandler={addCondition} text={'Add Condition'} />
          <Trash />
          {pastSteps ? <Button raised accent ripple onClick={undo}>Undo</Button> : <Button raised>Undo</Button>}
          {futureSteps ? <Button raised accent ripple onClick={redo}>Redo</Button> : <Button raised>Redo</Button>}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ribbon)
