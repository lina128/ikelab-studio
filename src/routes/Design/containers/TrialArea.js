import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import flow from 'lodash/flow'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { findIndexById } from '../utils/findIndex'
import { changeSetting } from '../modules/design'
import TrialWrapper from './TrialWrapper'
import SettingPane from './SettingPane'
import './TrialArea.scss'

const getEntities = (state) => state.design.present.entities
const getCurrentTrial = (state) => state.design.present.currentTrial

const getTrialMemoized = createSelector(
  [ getEntities, getCurrentTrial ],
  (entities, currentTrial) => {
    if (!currentTrial) {
      return null
    } else {
      return entities[findIndexById(entities, currentTrial)]
    }
  }
)

const mapStateToProps = (state) => {
  return {
    currentTrialObject: getTrialMemoized(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id, change) => {
      dispatch(changeSetting(id, change))
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export class TrialArea extends Component {
  static propTypes = {
    currentTrialObject: PropTypes.object,
    didChangeStructure: PropTypes.func,
    handleChange: PropTypes.func.isRequired
  }

  render () {
    const { currentTrialObject, handleChange } = this.props

    return (
      <div className={'design_trialArea_default'}>
        <TrialWrapper ref='trialWrapper' trial={currentTrialObject} onChange={handleChange} />
        <SettingPane trial={currentTrialObject} onChange={handleChange} />
      </div>
    )
  }
}

export default flow(
  DropTarget('', {}, collect),
  connect(mapStateToProps, mapDispatchToProps)
)(TrialArea)
