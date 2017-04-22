import React, { PureComponent, PropTypes } from 'react'
import Button from 'react-mdl/lib/Button'
import SummaryView from './SummaryView'

export default class PrintView extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { dialogOpen: false }
    this.openSummaryView = this.openSummaryView.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  static propTypes = {
    experiment: PropTypes.object.isRequired
  }

  openSummaryView () {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose () {
    this.setState({ dialogOpen: false })
  }

  render () {
    return (
      <div>
        <Button raised colored ripple onClick={this.openSummaryView}>Print</Button>
        <SummaryView
          dialogOpen={this.state.dialogOpen}
          handleClose={this.handleDialogClose}
          experiment={this.props.experiment} />
      </div>
    )
  }
}
