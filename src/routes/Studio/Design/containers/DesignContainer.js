import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import flow from 'lodash/flow'
import Spinner from 'react-mdl/lib/Spinner'
import FABButton from 'react-mdl/lib/FABButton'
import { fetchExperiment, saveExperiment } from '../modules/design'
import { getPlugin, IKELAB_EXPERIMENT_ENGINE_TRIAL_PREVIEW } from '../plugins/design'
import Design from '../components/Design'
import '../../../../styles/core.scss'

const style = {
  zIndex: 1999,
  position: 'absolute',
  display: 'none',
  backgroundColor: 'white',
  width: '800px',
  height: '600px'
}

const btnStyle = {
  position: 'absolute',
  top: '-25px',
  left: '770px'
}

const mapStateToProps = (state) => {
  return {
    experiment: state.design.present.experiment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExperiment: (id) => {
      dispatch(fetchExperiment(id))
    },
    saveExperiment: (experiment) => {
      dispatch(saveExperiment(experiment))
    }
  }
}

export class DesignContainer extends Component {
  constructor (props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.closeIframe = this.closeIframe.bind(this)
  }

  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    experiment: PropTypes.object,
    fetchExperiment: PropTypes.func.isRequired,
    saveExperiment: PropTypes.func.isRequired
  }

  componentDidMount () {
    const fetchId = parseInt(this.props.params.experimentId)
    const { fetchExperiment } = this.props

    fetchExperiment(fetchId)

    window.addEventListener('keydown', this.handleSave, false)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleSave)
  }

  handleSave (e) {
    if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
      e.preventDefault()
      this.props.saveExperiment(this.props)
    }
  }

  closeIframe (e) {
    const parent = e.target.parentElement
    if (parent) {
      parent.style.display = 'none'
      let lightoff = document.getElementById('lightoff')
      lightoff.style.height = '0'
    }
  }

  render () {
    const { experiment } = this.props
    const ikelabExperimentEngineTrialPreview = getPlugin(IKELAB_EXPERIMENT_ENGINE_TRIAL_PREVIEW)

    return (
      <div className='wrapper'>
        { !experiment ? <Spinner /> : <Design
          experiment={experiment} />}
        <div style={style}>
          <FABButton accent style={btnStyle} onClick={this.closeIframe}>X</FABButton>
          {ikelabExperimentEngineTrialPreview ? <iframe
            id='PLUGIN_IKELAB_EXPERIMENT_ENGINE_TRIAL_PREVIEW'
            src={ikelabExperimentEngineTrialPreview.url}
            width='800' height='600' frameBorder='0' /> : null}
        </div>
      </div>
    )
  }
}

export default flow(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(DesignContainer)
