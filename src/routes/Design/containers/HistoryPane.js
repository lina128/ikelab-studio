import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addBlockTrials, addWizard } from '../modules/design'
import Button from 'react-mdl/lib/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl/lib/Dialog'
import { List, ListItem } from 'react-mdl/lib/List'
import BlockBuild from './BlockBuild'
import * as wizards from '../elements/wizards'
import './HistoryPane.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    addBlockTrials: (block, trials) => {
      dispatch(addBlockTrials(block, trials))
    },
    addWizard: (type, name, setting) => {
      dispatch(addWizard(type, name, setting))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wizards: state.design.present.wizards
  }
}

export class HistoryPane extends Component {
  constructor (props) {
    super(props)
    this.state = { dialogOpen: false }
    this.openWizard = this.openWizard.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBuild = this.handleBuild.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  static propTypes = {
    wizards: PropTypes.array.isRequired,
    addBlockTrials: PropTypes.func.isRequired,
    addWizard: PropTypes.func.isRequired
  }

  openWizard (type, name, setting) {
    this.setState({ dialogOpen: true, type: type, name: name, setting: setting })
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
      this.props.addBlockTrials(wizard.block, wizard.trials)
      this.props.addWizard(this.state.type, this.state.name, this.state.setting)
      this.handleDialogClose()
    }
  }

  handleDialogClose () {
    this.setState({ dialogOpen: false })
  }

  renderItem (wizard, idx) {
    return <ListItem key={idx}
      onClick={() => { this.openWizard(wizard.type, wizard.name, wizard.setting) }}>
      {wizard.name}
    </ListItem>
  }

  render () {
    const { wizards } = this.props

    const listItem = wizards.map((w, idx) => this.renderItem(w, idx))

    return (
      <div className='design_historyPane_default'>
        <List>
          {listItem}
        </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPane)
