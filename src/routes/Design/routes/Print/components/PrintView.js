import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    experiment: state.design.present
  }
}

export class BluePrintView extends Component {
  render () {
    const { experiment } = this.props

    return (
      <div>
        {experiment.counter}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(BluePrintView)
