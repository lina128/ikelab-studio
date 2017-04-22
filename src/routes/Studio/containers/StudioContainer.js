import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createExperiment, fetchExperiments } from '../modules/studio'
import Studio from '../components/Studio'

const mapStateToProps = (state) => {
  return {
    experiments: state.studio.experiments,
    isFetching: state.studio.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createExperiment: () => {
      dispatch(createExperiment())
    },
    fetchExperiments: () => {
      dispatch(fetchExperiments())
    }
  }
}

export class StudioContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    experiments: PropTypes.array.isRequired,
    createExperiment: PropTypes.func.isRequired,
    fetchExperiments: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { fetchExperiments } = this.props

    fetchExperiments()
  }

  render () {
    const { isFetching, experiments, createExperiment } = this.props

    return (
      <div>
        <div>
          Start a new experiment
          <a onClick={createExperiment}>Blank</a>
        </div>
        <Studio isFetching={isFetching} experiments={experiments} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioContainer)
