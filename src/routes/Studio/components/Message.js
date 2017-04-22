import React, { PureComponent, PropTypes } from 'react'
import IconButton from 'react-mdl/lib/IconButton'
import './Message.scss'

export default class Message extends PureComponent {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  static propTypes = {
    message: PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired
    }),
    deleteMessage: PropTypes.func.isRequired
  }

  handleDelete () {
    this.props.deleteMessage(this.props.message.id)
  }

  render () {
    const { message } = this.props

    return (
      <div className='studio_message_default'>
        <div className='studio_message_html' dangerouslySetInnerHTML={{ __html: message.html }} />
        <IconButton name='close' colored onClick={this.handleDelete} />
      </div>
    )
  }
}
