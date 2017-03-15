import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Button from 'react-mdl/lib/Button'
import Popup from '../components/Popup'
import ExperimentRenderer from './ExperimentRenderer'

const mapStateToProps = (state) => {
  return {
    experiment: state.design.present
  }
}

export class PrintView extends Component {
  constructor (props) {
    super(props)
    this.state = { dialogOpen: false }
    this.togglePrintView = this.togglePrintView.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  static propTypes = {
    experiment: PropTypes.object.isRequired
  }

  togglePrintView () {
    if (this.state.dialogOpen) {
      this.setState({ dialogOpen: false })
    } else {
      this.setState({ dialogOpen: true, experiment: this.props.experiment })
    }
  }

  handleDialogClose () {
    this.setState({ dialogOpen: false })
  }

  render () {
    return (
      <div>
        <Button raised colored ripple onClick={this.togglePrintView}>Print</Button>
        <Popup dialogOpen={this.state.dialogOpen} handleClose={this.handleDialogClose} >
          <ExperimentRenderer experiment={this.state.experiment} />
        </Popup>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(PrintView)
