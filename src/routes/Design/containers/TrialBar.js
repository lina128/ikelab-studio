import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { findNode } from '../modules/utils/node'
import { removeTrialCondition } from '../modules/design'
import { Chip } from 'react-mdl/lib/Chip'
import './TrialBar.scss'

const getStructure = (state) => state.design.present.structure
const getCurrentTrial = (state) => state.design.present.currentTrial

const getTrialMemoized = createSelector(
  [ getStructure, getCurrentTrial ],
  (structure, currentTrial) => {
    if (!currentTrial) {
      return null
    } else {
      return findNode(structure, currentTrial)
    }
  }
)

const mapStateToProps = (state) => {
  return {
    trial: getTrialMemoized(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeTrialCondition: (id, condition) => {
      dispatch(removeTrialCondition(id, condition))
    }
  }
}

export class TrialBar extends Component {
  static propTypes = {
    trial: PropTypes.object,
    removeTrialCondition: PropTypes.func.isRequired
  }

  render () {
    const { trial } = this.props

    return (
      <div className='design_trialBar_default'>
        {trial ? trial.condition.map((c, idx) => {
          return (<Chip key={idx} style={{ backgroundColor: c }} onClose={() => {
            this.props.removeTrialCondition(trial.id, c)
          }} />)
        }) : ''}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrialBar)
