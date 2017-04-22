import React, { PureComponent, PropTypes } from 'react'
import Message from './Message'
import './MessageBar.scss'

export default class MessageBar extends PureComponent {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    deleteMessage: PropTypes.func.isRequired
  }

  render () {
    const { messages, deleteMessage } = this.props

    return (
      <div className='studio_messageBar_default'>
        {messages.map(
          m => <Message key={m.id} message={m} deleteMessage={deleteMessage} />
        )}
      </div>
    )
  }
}
