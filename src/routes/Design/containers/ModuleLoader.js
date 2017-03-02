import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-mdl/lib/Button'
import Menu from 'react-mdl-portal-menu/lib/Menu'
import MenuItem from 'react-mdl-portal-menu/lib/MenuItem'
import { addTrial, addBlock, addRun } from '../modules/design'
import { MENU_CONTENT } from '../constants'
import './ModuleLoader.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    addTrial: (type) => {
      dispatch(addTrial(type))
    },
    addBlock: () => {
      dispatch(addBlock())
    },
    addRun: () => {
      dispatch(addRun())
    }
  }
}

export class ModuleLoader extends Component {
  constructor (props) {
    super(props)

    this.renderOptions = this.renderOptions.bind(this)
  }

  renderOptions (arr, options, lvl) {
    if (!options) return

    for (let i = 0; i < options.length; i++) {
      arr.push(<MenuItem
        key={options[i].name}
        onClick={() => {
          this.props[options[i].onClick](options[i].type)
        }}><span
          className={'design_moduleLoader_option_lvl' + lvl}>
          {options[i].name}</span></MenuItem>)
      if (options[i].children) {
        this.renderOptions(arr, options[i].children, (lvl + 1))
      }
    }
  }

  render () {
    const menuItems = []
    this.renderOptions(menuItems, MENU_CONTENT, 0)

    const btn = (<Button raised colored ripple>
      Add
    </Button>)

    return (
      <Menu target={btn} valign={'bottom'} align={'left'}>
        {menuItems}
      </Menu>)
  }
}

export default connect(null, mapDispatchToProps)(ModuleLoader)
