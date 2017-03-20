import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './MessageBar.scss'

const mapStateToProps = (state) => {
  return {
    messages: state.design.present.messages
  }
}

export class MessageBar extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  }

  render () {
    const { messages } = this.props

    return (
      <div className='design_messageBar_default'>
        {messages.map((m, i) => <div key={i} id={i} className='design_messageBar_message'>{m}</div>)}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(MessageBar)
