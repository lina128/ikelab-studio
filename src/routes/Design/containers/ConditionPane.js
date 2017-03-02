import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { renameCondition, toggleSelectMode, removeCondition } from '../modules/design'
import List from '../components/List'
import ListItem from '../components/ListItem'
import Input from '../components/Input'
import MagicWand from '../components/MagicWand'
import IconButton from 'react-mdl/lib/IconButton'
import './ConditionPane.scss'

const mapStateToProps = (state) => {
  return {
    condition: state.design.present.condition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
    condition: PropTypes.array.isRequired,
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
            onRemoveCondition(condition[i].color)
          }} />
        </ListItem>
      )
    }
    return (
      <div className={'design_conditionPane_default'}>
        <h1>Condition</h1>
        <List customStyle={{ listStyle: 'none' }}>
          {conditionList}
        </List>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionPane)
