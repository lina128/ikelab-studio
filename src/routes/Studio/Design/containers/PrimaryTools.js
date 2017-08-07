import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { ActionCreators } from 'redux-undo'
import { Link } from 'react-router'
import PrintViewContainer from './PrintViewContainer'
import ModuleLoaderContainer from './ModuleLoaderContainer'
import RibonCardLoader from '../components/RibonCardLoader'
import { addCondition } from '../modules/design'
import Button from 'react-mdl/lib/Button'
import '../../../../styles/core.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    undo: () => {
      dispatch(ActionCreators.undo())
    },
    redo: () => {
      dispatch(ActionCreators.redo())
    },
    addCondition: () => {
      dispatch(addCondition())
    }
  }
}

export class PrimaryTools extends Component {
  static propTypes = {
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    pastSteps: PropTypes.bool.isRequired,
    futureSteps: PropTypes.bool.isRequired,
    addCondition: PropTypes.func.isRequired
  }

  render () {
    const { undo, redo, addCondition } = this.props

    return (
      <div className='wrapper'>
        <ModuleLoaderContainer />
        <Button ripple onClick={addCondition}>condition<i className='material-icons'>add</i></Button>
        <Button ripple onClick={undo} style={{ left: '5px' }}>undo<i className='material-icons'>undo</i></Button>
        <Button ripple onClick={redo}>redo<i className='material-icons'>redo</i></Button>
        <Button ripple style={{ left: '5px' }}>print<i className='material-icons'>print</i></Button>
        <Button ripple style={{ position: 'absolute', right: '5px' }}>Preview Experiment<i className='material-icons'>play_arrow</i></Button>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(PrimaryTools)

/*
        <PrintViewContainer />
        <Link to='/blueprint' state={{ foo: 'bar' }} />
        <RibonCardLoader name='Condition'>
          <ConditionPane />
        </RibonCardLoader>
        */
