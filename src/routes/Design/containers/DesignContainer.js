import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import flow from 'lodash/flow'
import uniqueId from 'lodash/uniqueId'
import { auth0 } from '../../../containers/AppContainer'
import { fetchExperiment, addMessage, deleteMessage, updateStore } from '../modules/design'
import { AUTO_SAVE_DURATION } from '../config'
import Spinner from 'react-mdl/lib/Spinner'
import Ribbon from './Ribbon'
import FirstColumn from '../components/FirstColumn'
import SecondColumn from '../components/SecondColumn'
import ThirdColumn from '../components/ThirdColumn'
import DesignPane from './DesignPane'
import TrialPane from './TrialPane'
import SettingPane from './SettingPane'
import MessageBar from './MessageBar'
import './DesignContainer.scss'

const mapStateToProps = (state) => {
  return {
    counter: state.design.present.counter,
    name: state.design.present.name,
    condition: state.design.present.condition,
    structure: state.design.present.structure,
    entity: state.design.present.entity,
    currentTrial: state.design.present.currentTrial,
    isFetching: state.design.present.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (id, msg) => {
      dispatch(addMessage(id, msg))
    },
    deleteMessage: (id) => {
      dispatch(deleteMessage(id))
    },
    updateStore: (data) => {
      dispatch(updateStore(data))
    },
    fetchExperiment: (id) => {
      dispatch(fetchExperiment(id))
    }
  }
}

export class DesignContainer extends Component {
  constructor (props) {
    super(props)
    this.increaseTimer = this.increaseTimer.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.increaseTimer = this.increaseTimer.bind(this)
    this.autoSave = null
    this.timer = 0
    this.errorId = null
  }

  static propTypes = {
    experimentId: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired,
    name: PropTypes.string,
    condition: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired,
    currentTrial: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    addMessage: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    updateStore: PropTypes.func.isRequired,
    fetchExperiment: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { experimentId, fetchExperiment } = this.props

    fetchExperiment(experimentId)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.timer > AUTO_SAVE_DURATION) {
      this.saveExperiment(this.props)
      this.resetTimer()
    }
  }

  componentWillUnmount () {
    clearInterval(this.autoSave)
    clearInterval(this.autoReset)
  }

  increaseTimer () {
    this.timer++
  }

  resetTimer () {
    this.timer = 0
  }

  handleSave (e) {
    if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
      e.preventDefault()
      this.saveExperiment(this.props)
    }
  }

  saveExperiment (props) {
    const { counter, name, condition, structure, entity, addMessage, deleteMessage } = props

    var that = this

    fetch('http://localhost:6060', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth0.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        counter: counter,
        name: name,
        condition: condition,
        structure: structure,
        entity: entity
      })
    })
    .then(response => {
      return response.json().then(data => {
        if (response.ok) {
          if (that.errorId) {
            deleteMessage(that.errorId)
            that.errorId = null
          }
          return data
        } else {
          if (!that.errorId) {
            that.errorId = uniqueId()
            addMessage(that.errorId, 'Could not save changes.')
          }

          return Promise.reject({ status: response.status, data })
        }
      })
    })
    .catch(error => {
      if (!that.errorId) {
        that.errorId = uniqueId()
        addMessage(that.errorId, 'Could not save changes.')
      }

      console.log(error)
    })
  }

  render () {
    const { experimentId, isFetching, currentTrial, structure, entity } = this.props

    const trial = entity[currentTrial] || null

    return (
      <div>
        {experimentId ? (isFetching ? <Spinner />
         : <div className='design_container1'>
           <Ribbon />
           <div className='design_container2'>
             <FirstColumn>
               <DesignPane structure={structure} />
             </FirstColumn>
             <ThirdColumn>
               <SettingPane id={currentTrial} trial={trial} />
             </ThirdColumn>
             <SecondColumn>
               <TrialPane id={currentTrial} trial={trial} />
             </SecondColumn>
           </div>
           <MessageBar />
         </div>)
        : null}
      </div>
    )
  }
}

export default flow(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(DesignContainer)
