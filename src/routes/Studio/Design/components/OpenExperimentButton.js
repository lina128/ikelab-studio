import React, { PureComponent, PropTypes } from 'react'
import IconButton from 'react-mdl/lib/IconButton'

export default class OpenExperimentButton extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { target: '' }
    this.handleClick = this.handleClick.bind(this)
    this.handleExperimentWindowReady = this.handleExperimentWindowReady.bind(this)
  }

  static propTypes = {
    onExperimentWindowReady: PropTypes.func,
    url: PropTypes.string.isRequired
  }

  handleClick () {
    const target = window.open(
      this.props.url,
      'ikelab experiment',
      'width={screen.width}, height={screen.height}')
    this.setState({ target: target })
  }

  handleExperimentWindowReady (event) {
    if (this.props.onExperimentWindowReady) {
      this.props.onExperimentWindowReady(this.state.target, event)
    }
  }

  componentDidMount () {
    if (this.props.onExperimentWindowReady) {
      window.addEventListener('message', this.handleExperimentWindowReady)
    }
  }

  componentWillUnmount () {
    if (this.props.onExperimentWindowReady) {
      window.removeEventListener('message', this.handleExperimentWindowReady)
    }
  }

  render () {
    return (
      <IconButton name='visibility' colored ripple onClick={this.handleClick} />
    )
  }
}
