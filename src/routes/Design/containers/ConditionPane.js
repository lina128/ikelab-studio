import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addCondition, renameCondition, toggleSelectMode, removeCondition } from '../modules/design'
import List from '../components/List'
import ListItem from '../components/ListItem'
import Input from '../components/Input'
import MagicWand from '../components/MagicWand'
import IconButton from 'react-mdl/lib/IconButton'
import Button from 'react-mdl/lib/Button'
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
    this.handleWandClick = this.handleWandClick.bind(this)
  }

  static propTypes = {
    addCondition: PropTypes.func.isRequired,
    condition: PropTypes.object.isRequired,
    onSelectMode: PropTypes.func.isRequired,
    onRenameCondition: PropTypes.func.isRequired,
    onRemoveCondition: PropTypes.func.isRequired
  }

  handleWandClick (key, content) {
    this.props.onSelectMode(key, content, 'extend')
  }

  render () {
    const { condition, onRenameCondition, onRemoveCondition } = this.props
    const conditionList = []

    for (let id in condition) {
      conditionList.push(
        <ListItem key={id}>
          <Input
            customStyle={{ width: '100px', border:'none', color:condition[id].color }}
            value={condition[id].name}
            onBlur={(event) => { onRenameCondition(id, event.target.value) }} />
          <MagicWand
            id={'cond_sele_' + id}
            content={{ condition: { [id]: { ...condition[id] } } }}
            onWandClick={this.handleWandClick}>Select trials</MagicWand>
          <IconButton name='delete' colored onClick={() => {
            onRemoveCondition(id)
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionPane)
