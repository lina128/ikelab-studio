import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './MagicWand.scss'

export default class MagicWand extends Component {
  constructor (props) {
    super(props)
    this._onClick = this._onClick.bind(this)
    this.state = { active: false }
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    onWandClick: PropTypes.func.isRequired
  }

  _onClick () {
    this.setState({ active: !this.state.active })
    this.props.onWandClick(this.props.id, this.props.content)
  }

  render () {
    const isActive = this.state.active ? 'active' : 'inactive'
    const classnames = classNames('design_magicWand_default', isActive)

    return (
      <div className={classnames} onClick={this._onClick} />
    )
  }
}
