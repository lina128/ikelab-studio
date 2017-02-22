import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import html2canvas from 'html2canvas'
import { connect } from 'react-redux'
import { updateStructure } from '../modules/design'
import * as frames from '../elements/frames'
import CenterFrame from '../components/CenterFrame'

const mapDispatchToProps = (dispatch) => {
  return {
    didChangeStructure: (id, screenshot) => {
      dispatch(updateStructure(id, { screenshot: screenshot }))
    }
  }
}

export class TrialWrapper extends Component {
  static propTypes = {
    trial: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  componentDidUpdate () {
    let mapNode = ReactDOM.findDOMNode(this.refs.trialWrapper)
    let that = this
    html2canvas(mapNode, {
      useCORS: true
    }).then(function (canvas) {
      that.props.didChangeStructure(that.props.trial.id, canvas.toDataURL())
    })
  }

  render () {
    const { trial, onChange } = this.props

    if (trial) {
      const MyComponent = frames[trial.type] || frames['DEFAULTDISPLAY']

      return (
        <CenterFrame>
          <MyComponent ref='trialWrapper' style={{ width: '100%', height: '100%' }} trial={trial} onChange={onChange} />
        </CenterFrame>
      )
    } else {
      return (
        <CenterFrame />
      )
    }
  }
}

export default connect(null, mapDispatchToProps)(TrialWrapper)
