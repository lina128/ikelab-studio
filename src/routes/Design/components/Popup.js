import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import html2canvas from 'html2canvas'
import Button from 'react-mdl/lib/Button'
import './Popup.scss'

export default class Popup extends Component {
  constructor (props) {
    super(props)
    this.print = this.print.bind(this)
  }

  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  print () {
    let mapNode = ReactDOM.findDOMNode(this.refs.popup)
    if (mapNode) {
      const that = this
      html2canvas(mapNode).then(
        function (canvas) {
          let a = ReactDOM.findDOMNode(that.refs.download)
          a.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
          a.download = 'printview.png'
          a.click()
        },
        function (error) {
          console.log(error)
        }
      )
    }
  }

  render () {
    const { dialogOpen, handleClose } = this.props
    return (
      <div
        ref='popup'
        className='design_popup_default'
        style={{
          display: dialogOpen ? 'block' : 'none',
          left: (window.innerWidth - 800) / 2 }}>
        <a ref='download' />
        <h4>Print View</h4>
        <Button className='design_popup_cancel' raised colored ripple onClick={handleClose}>Cancel</Button>
        <Button className='design_popup_btn' raised accent ripple onClick={this.print}>Print</Button>
        {this.props.children}
      </div>
    )
  }
}
