import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import uniqueId from 'lodash/uniqueId'
import { Link } from 'react-router'
import { auth0Lock } from '../../../containers/AppContainer'
import { addMessage, deleteMessage } from '../modules/studio'
import MessageBar from '../containers/MessageBar'

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (id, msg) => {
      dispatch(addMessage(id, msg))
    },
    deleteMessage: (id) => {
      dispatch(deleteMessage(id))
    }
  }
}

export class StudioView extends Component {
  constructor (props) {
    super(props)
    this.state = { experiments: [] }
    this.errorId = null
    this.renderExperiment = this.renderExperiment.bind(this)
  }

  static propTypes = {
    addMessage: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { addMessage } = this.props

    fetch('http://localhost:5050', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth0Lock.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 'user2'
      })
    })
    .then(response => {
      return response.json().then(data => {
        if (response.ok) {
          this.setState({ experiments: data })
        } else {
          this.errorId = uniqueId()
          addMessage(this.errorId, 'Could not fetch experiments.')
          return Promise.reject({ status: response.status, data })
        }
      })
    })
    .catch(error => {
      this.errorId = uniqueId()
      addMessage(this.errorId, 'Could not connect to the server.')
      console.log(error)
    })
  }

  renderExperiment (experiment) {
    const path = '/design/' + experiment.experiment_id

    return (
      <li key={experiment.experiment_id}>
        <Link to={path}>
          {experiment.name}
        </Link>
      </li>
    )
  }

  render () {
    return (
      <div>
        <h2>Experiments</h2>
        <ul>
          {this.state.experiments.map((experiment) => this.renderExperiment(experiment))}
        </ul>
        <MessageBar />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(StudioView)
