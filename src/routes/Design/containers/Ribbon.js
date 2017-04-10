import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { ActionCreators } from 'redux-undo'
import { Link } from 'react-router'
import Trash from './Trash'
import PrintView from './PrintView'
import ModuleLoader from './ModuleLoader'
import RibonCardLoader from '../components/RibonCardLoader'
import ConditionPane from './ConditionPane'
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
    undo: () => {
      dispatch(ActionCreators.undo())
    },
    redo: () => {
      dispatch(ActionCreators.redo())
    }
  }
}

export class Ribbon extends Component {
  constructor (props) {
    super(props)
    this.state = { cardOpen: 'none' }
  }

  static propTypes = {
    undo: PropTypes.func,
    redo: PropTypes.func,
    pastSteps: PropTypes.bool,
    futureSteps: PropTypes.bool
  }

  render () {
    const { undo, redo, pastSteps, futureSteps } = this.props

    return (
      <div className={'design_ribbon_default'}>
        <PrintView />
        <Link to='/blueprint' state={{ foo: 'bar' }} />
        <ModuleLoader />
        <RibonCardLoader name='Condition'>
          <ConditionPane />
        </RibonCardLoader>
        <Trash />
        {pastSteps ? <Button raised accent ripple onClick={undo}>Undo</Button> : <Button raised>Undo</Button>}
        {futureSteps ? <Button raised accent ripple onClick={redo}>Redo</Button> : <Button raised>Redo</Button>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ribbon)
