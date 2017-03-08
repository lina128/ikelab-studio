import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addCondition, renameCondition, toggleSelectMode, removeCondition } from '../modules/design'
import List from '../components/List'
import ListItem from '../components/ListItem'
import Input from '../components/Input'
import MagicWand from '../components/MagicWand'
import IconButton from 'react-mdl/lib/IconButton'
import Button from 'react-mdl/lib/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl/lib/Dialog'
import './ConditionPane.scss'

const mapStateToProps = (state) => {
  return {
    condition: state.design.present.condition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCondition: () => {
      dispatch(addCondition())
    },
    onRenameCondition: (color, value) => {
      dispatch(renameCondition(color, value))
    },
    onSelectMode: (id, setting, op) => {
      dispatch(toggleSelectMode(id, setting, op))
    },
    onRemoveCondition: (id) => {
      dispatch(removeCondition(id))
    }
  }
}

export class ConditionPane extends Component {
  constructor (props) {
    super(props)
    this.state = { dialogOpen: false }
    this.handleWandClick = this.handleWandClick.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleRemoveCondition = this.handleRemoveCondition.bind(this)
  }

  static propTypes = {
    addCondition: PropTypes.func.isRequired,
    condition: PropTypes.array.isRequired,
    onSelectMode: PropTypes.func.isRequired,
    onRenameCondition: PropTypes.func.isRequired,
    onRemoveCondition: PropTypes.func.isRequired
  }

  handleWandClick (key, content) {
    this.props.onSelectMode(key, content, 'extend')
  }

  handleDialogOpen (color) {
    this.setState({ dialogOpen: true, color: color })
  }

  handleDialogClose () {
    this.setState({ dialogOpen: false })
  }

  handleRemoveCondition () {
    this.props.onRemoveCondition(this.state.color)
    this.handleDialogClose()
  }

  render () {
    const { condition, onRenameCondition } = this.props
    const conditionList = []

    for (let i = 0; i < condition.length; i++) {
      conditionList.push(
        <ListItem key={condition[i].color}>
          <Input
            customStyle={{ width: '100px', border:'none', color:condition[i].color }}
            value={condition[i].name}
            onBlur={(event) => { onRenameCondition(condition[i].color, event.target.value) }} />
          <MagicWand
            id={'cond_sele_' + condition[i].color}
            content={{ condition: [condition[i].color] }}
            onWandClick={this.handleWandClick}>Select trials</MagicWand>
          <IconButton name='delete' colored onClick={() => {
            this.handleDialogOpen(condition[i].color)
          }} />
        </ListItem>
      )
    }
    return (
      <div className={'design_conditionPane_default'}>
        <Button raised colored ripple onClick={this.props.addCondition}>Add condition</Button>
        <List customStyle={{ listStyle: 'none' }}>
          {conditionList}
        </List>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Delete condition</DialogTitle>
          <DialogContent>
            Are you sure?
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.handleRemoveCondition}>Delete</Button>
            <Button type='button' onClick={this.handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionPane)
