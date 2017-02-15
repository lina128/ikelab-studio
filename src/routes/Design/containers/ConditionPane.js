import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { renameCondition } from '../modules/design'
import { toggleSelectMode } from '../modules/design'
import List from '../components/List'
import ListItem from '../components/ListItem'
import HorizontalBar from '../components/HorizontalBar'
import Input from '../components/Input'
import MagicWand from '../components/MagicWand'
import './ConditionPane.scss'

const mapStateToProps = (state) => {
  return {
    condition: state.design.present.condition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRenameCondition: (id, value) => {
      dispatch(renameCondition(id, value))
    },
    onSelectMode: (id, setting, op) => {
      dispatch(toggleSelectMode(id, setting, op))
    }
  }
}

export class ConditionPane extends Component {
  constructor (props) {
    super(props)
    this.handleWandClick = this.handleWandClick.bind(this)
  }

  static propTypes = {
    condition: PropTypes.array.isRequired
  }

  handleWandClick (key, content) {
    this.props.onSelectMode(key, content, 'extend')
  }

  render () {
    const { condition, onRenameCondition, onSelectMode } = this.props
    const conditionList = []

    for (let i = 0; i < condition.length; i++) {
      conditionList.push(
        <ListItem key={condition[i].id} id={condition[i].id}>
          <Input customStyle={{ border:'none', color:condition[i].color }} value={condition[i].name} onBlur={(event) => { onRenameCondition(condition[i].id, event.target.value) }} />
          <MagicWand id={'cond_sele_' + condition[i].id} content={{ condition: [condition[i].color] }} onWandClick={this.handleWandClick}>Select trials</MagicWand>
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
