import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Button from 'react-mdl/lib/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl/lib/Dialog'
import Menu from 'react-mdl-extra/lib/Menu'
import MenuItem from 'react-mdl-extra/lib/MenuItem'
import { addTrial, addBlock, addRun, addBlockTrials, addWizard } from '../modules/design'
import { MENU_CONTENT } from '../constants'
import BlockBuild from './BlockBuild'
import * as wizards from '../elements/wizards'
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
    },
    addBlockTrials: (block, trials) => {
      dispatch(addBlockTrials(block, trials))
    },
    addWizard: (type, name, setting) => {
      dispatch(addWizard(type, name, setting))
    }
  }
}

export class ModuleLoader extends Component {
  constructor (props) {
    super(props)
    this.state = { dialogOpen: false }
    this.renderOptions = this.renderOptions.bind(this)
    this.openWizard = this.openWizard.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBuild = this.handleBuild.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  static propTypes = {
    addTrial: PropTypes.func.isRequired,
    addBlock: PropTypes.func.isRequired,
    addRun: PropTypes.func.isRequired,
    addBlockTrials: PropTypes.func.isRequired,
    addWizard: PropTypes.func.isRequired
  }

  handleDialogClose () {
    this.setState({ dialogOpen: false })
  }

  openWizard (type, name) {
    this.setState({ dialogOpen: true, type: type, name: name, setting: {} })
  }

  handleChange (id, setting) {
    this.setState({
      ...this.state,
      setting: {
        ...this.state.setting,
        ...setting
      }
    })
  }

  handleBuild () {
    const wizard = wizards[this.state.type](this.state.setting)
    if (wizard.error) {
      this.setState({
        ...this.state,
        error: wizard.error
      })
    } else {
      console.log(wizard)
      this.props.addBlockTrials(wizard.block, wizard.trials)
      this.props.addWizard(this.state.type, this.state.name, this.state.setting)
      this.handleDialogClose()
    }
  }

  renderOptions (arr, options, lvl) {
    if (!options) return

    for (let i = 0; i < options.length; i++) {
      if (options[i].onClick) {
        if (typeof this.props[options[i].onClick] === 'function') {
          // use functions from mapDispatchToProps
          arr.push(<MenuItem key={options[i].type} onClick={() => { this.props[options[i].onClick](options[i].type) }}>
            <span className={'design_moduleLoader_option_lvl' + lvl}>
              {options[i].name}
            </span></MenuItem>)
          if (options[i].children) {
            this.renderOptions(arr, options[i].children, (lvl + 1))
          }
        } else if (typeof this[options[i].onClick] === 'function') {
          // use functions from ModuleLoader
          arr.push(<MenuItem
            key={options[i].type}
            onClick={() => { this[options[i].onClick](options[i].type, options[i].name) }}>
            <span className={'design_moduleLoader_option_lvl' + lvl}>
              {options[i].name}
            </span></MenuItem>)
          if (options[i].children) {
            this.renderOptions(arr, options[i].children, (lvl + 1))
          }
        } else {
          arr.push(<MenuItem key={options[i].type} onClick={() => {}}>
            <span className={'design_moduleLoader_option_lvl' + lvl}>
              {options[i].name}
            </span></MenuItem>)
          if (options[i].children) {
            this.renderOptions(arr, options[i].children, (lvl + 1))
          }
        }
      } else {
        arr.push(<MenuItem key={options[i].name}>
          <span className={'design_moduleLoader_option_lvl' + lvl}>
            {options[i].name}
          </span></MenuItem>)
        if (options[i].children) {
          this.renderOptions(arr, options[i].children, (lvl + 1))
        }
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
      <div className='design_moduleLoader_default'>
        <Menu target={btn} align={'tl bl'}>
          {menuItems}
        </Menu>
        <Dialog style={{ width: '800px', maxHeight: window.innerHeight - 50 + 'px' }} open={this.state.dialogOpen}>
          <DialogTitle>
            Block Build - {this.state.name}
          </DialogTitle>
          <DialogContent>
            <BlockBuild type={this.state.type} onChange={this.handleChange} dialogOpen={this.state.dialogOpen} />
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.handleBuild}>Build</Button>
            <Button type='button' onClick={this.handleDialogClose}>Cancel</Button>
            {this.state.error ? <Button accent>{this.state.error}</Button> : null}
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ModuleLoader)
