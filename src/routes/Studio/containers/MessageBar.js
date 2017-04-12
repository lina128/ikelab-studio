import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { deleteMessage } from '../modules/studio'
import Message from '../components/Message'
import './MessageBar.scss'

const mapStateToProps = (state) => {
  return {
    messages: state.studio.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: (id) => {
      dispatch(deleteMessage(id))
    }
  }
}

export class MessageBar extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    deleteMessage: PropTypes.func.isRequired
  }

  render () {
    const { messages, deleteMessage } = this.props

    return (
      <div className='design_messageBar_default'>
        {messages.map(
          m => <Message key={m.id} message={m} deleteMessage={deleteMessage} />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar)
