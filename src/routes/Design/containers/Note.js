import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    message: state.design.present.message
  }
}

export class Note extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render () {
    const { message } = this.props
    const visibility = message ? 'visible' : 'hidden'

    return (
      <div className={'design_note'} style={{ visibility: visibility }}>
        {message}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Note)
