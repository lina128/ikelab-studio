import React, {
  PureComponent,
  PropTypes
} from 'react'
import Button from 'react-mdl/lib/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl/lib/Dialog'
import './TrialTools.scss'
import './ConditionTools.scss'

export default class ConditionTools extends PureComponent {
  constructor () {
    super()
    this.state = {
      dialogState: {
        isOpen: false,
        key: null,
        condition: {}
      },
      nameField: null
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.deleteCondition = this.deleteCondition.bind(this)
  }

  static propTypes = {
    experiment: PropTypes.object.isRequired,
    toggleTrialCondition: PropTypes.func.isRequired,
    deleteCondition: PropTypes.func.isRequired,
    renameCondition: PropTypes.func.isRequired
  }

  handleOpenDialog (key, value) {
    this.setState({
      ...this.state,
      dialogState: {
        isOpen: true,
        key: key,
        condition: value
      }
    })
  }

  handleCloseDialog () {
    if (this.state.nameField.value && this.state.nameField.value !== this.state.dialogState.condition.name) {
      this.props.renameCondition(this.state.dialogState.key, this.state.nameField.value)
      this.state.nameField.value = ''
    }
    this.setState({
      ...this.state,
      dialogState: {
        isOpen: false,
        key: null,
        condition: {}
      }
    })
  }

  deleteCondition () {
    this.props.deleteCondition(this.state.dialogState.key)
    this.setState({
      ...this.state,
      dialogState: {
        isOpen: false,
        key: null,
        condition: {}
      }
    })
  }

  render () {
    const { experiment, toggleTrialCondition } = this.props

    const conditionList = []

    let className
    for (let c in experiment.condition) {
      if (experiment.currentTrial &&
          experiment
          .entity[experiment.currentTrial]
          .type !== 'BLOCK' &&
          experiment.entity[experiment.currentTrial]
          .type !== 'RUN' &&
          experiment.entity[experiment.currentTrial].condition.indexOf(c) > -1) {
        className = 'condition_btn_highlight'
      } else {
        className = 'condition_btn_default'
      }
      conditionList.push(<div key={c}><Button className={className} ripple onClick={() => {
        toggleTrialCondition(c)
      }}>
        {experiment.condition[c].name}
      </Button><div className='condition_btn_end' onClick={(e) => {
        e.stopPropagation()
        this.handleOpenDialog(c, experiment.condition[c])
      }}>
        <i className='material-icons'>settings</i>
      </div></div>)
    }

    return (
      <div className='design_trialtools_default' style={{ float: 'left' }}>
        {conditionList}
        <Dialog open={this.state.dialogState.isOpen}>
          <DialogTitle>{this.state.dialogState.condition.name}</DialogTitle>
          <DialogContent>
            <input
              className='design_conditionTools_input'
              ref={(c) => { this.state.nameField = c }}
              placeholder='Edit name...' />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteCondition}>Delete</Button>
            <Button onClick={this.handleCloseDialog}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
