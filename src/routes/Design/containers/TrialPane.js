import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { changeTrialSetting, updateStructure } from '../modules/design'
import flow from 'lodash/flow'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import html2canvas from 'html2canvas'
import { Card } from 'react-mdl/lib/Card'
import * as frames from '../elements/frames'
import './TrialPane.scss'

const mapStateToProps = (state) => {
  return {
    id: state.design.present.currentTrial || 0,
    trial: state.design.present.entity[state.design.present.currentTrial]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id, change) => {
      dispatch(changeTrialSetting(id, change))
    },
    didChangeStructure: (id, screenshot) => {
      dispatch(updateStructure(id, { screenshot: screenshot }))
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export class TrialPane extends Component {
  static propTypes = {
    id: PropTypes.number,
    trial: PropTypes.object,
    handleChange: PropTypes.func.isRequired
  }

  componentDidUpdate () {
    let mapNode = ReactDOM.findDOMNode(this.refs.trialWrapper)
    if (mapNode) {
      let that = this
      html2canvas(mapNode, {
        useCORS: true
      }).then(
        function (canvas) {
          that.props.didChangeStructure(that.props.id, canvas.toDataURL('image/webp'))
        },
        function (error) {
          console.log(error)
        }
      )
    }
  }

  render () {
    const { id, trial, handleChange } = this.props

    if (trial) {
      const MyComponent = frames[trial.type] || frames['DEFAULTDISPLAY']

      return (
        <Card shadow={6} className='design_trialPane_default'>
          <MyComponent
            ref='trialWrapper'
            style={{ width: '100%', height: '100%' }}
            id={id}
            trial={trial}
            onChange={handleChange} />
        </Card>
      )
    } else {
      return (
        <Card shadow={6} className='design_trialPane_default' />
      )
    }
  }
}

export default flow(
  DropTarget('', {}, collect),
  connect(mapStateToProps, mapDispatchToProps)
)(TrialPane)
