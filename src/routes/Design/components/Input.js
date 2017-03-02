import React, { Component, PropTypes } from 'react'

export default class Input extends Component {
  constructor (props) {
    super(props)
    this.state = { value: props.value }
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    customStyle: PropTypes.object,
    onBlur: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.setState({ value: nextProps.value })
    }
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    const { customStyle, onBlur, disabled } = this.props

    return (
      <input
        style={customStyle}
        type='text'
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={onBlur}
        disabled={disabled} />
    )
  }
}
