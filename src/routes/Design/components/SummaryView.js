import React, { Component, PropTypes } from 'react'
import html2canvas from 'html2canvas'
import Button from 'react-mdl/lib/Button'
import ExperimentRenderer from './ExperimentRenderer'
import './SummaryView.scss'

const defaultObject = {}

export default class SummaryView extends Component {
  constructor (props) {
    super(props)
    this.print = this.print.bind(this)
  }

  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    experiment: PropTypes.object
  }

  componentDidMount () {
    if (this.props.dialogOpen && this.dialogRef) {
      this.dialogRef.style.display = 'block'
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.dialogOpen) {
      if (this.props.dialogOpen !== prevProps.dialogOpen) {
        if (this.props.dialogOpen && this.dialogRef) {
          this.dialogRef.style.display = 'block'

          if (this.dialogRef) {
            this.dialogRef.style.left = `${(window.innerWidth - 800) / 2}px`
          }
        }
      }
    } else {
      this.dialogRef.style.display = 'none'
    }
  }

  print () {
    let mapNode = this.dialogRef
    if (mapNode) {
      const that = this
      html2canvas(mapNode).then(
        function (canvas) {
          let a = that.downloadRef
          if (a) {
            a.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            a.download = 'printview.png'
            a.click()
          }
        },
        function (error) {
          console.log(error)
        }
      )
    }
  }

  render () {
    const { handleClose, experiment } = this.props

    return (
      <div
        ref={(c) => (this.dialogRef = c)}
        className='design_popup_default' >
        <a ref={(c) => (this.downloadRef = c)} />
        <h4>Print View</h4>
        <Button className='design_popup_cancel' raised colored ripple onClick={handleClose}>Cancel</Button>
        <Button className='design_popup_btn' raised accent ripple onClick={this.print}>Print</Button>
        <ExperimentRenderer dialogOpen={this.props.dialogOpen} experiment={experiment || defaultObject} />
      </div>
    )
  }
}
