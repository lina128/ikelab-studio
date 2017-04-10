import React, { Component, PropTypes } from 'react'
import Button from 'react-mdl/lib/Button'
import AbsolutePosition from '../components/AbsolutePosition'

export default class RibonCardLoader extends Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
    this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    name: PropTypes.string.isRequired
  }

  toggleDisplay (event) {
    const bodyRect = document.body.getBoundingClientRect()
    const targetRect = event.target.getBoundingClientRect()
    this.setState({
      isOpen: !this.state.isOpen,
      top: targetRect.bottom + 15 - bodyRect.top,
      left: targetRect.left - 100 - bodyRect.left
    })
  }

  render () {
    const { name } = this.props

    const btn = <Button raised colored ripple onClick={this.toggleDisplay}>{name}</Button>

    return (
      <div>
        {btn}
        <AbsolutePosition
          isOpen={this.state.isOpen}
          left={this.state.left + 'px'}
          top={this.state.top + 'px'}
          width='300px'>
          {this.props.children}
        </AbsolutePosition>
      </div>
    )
  }
}
