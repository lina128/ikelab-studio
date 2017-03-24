import React, { Component, PropTypes } from 'react'
import { ITEMTYPES } from '../../constants'
import { DropTarget } from 'react-dnd'
import Redbox from './Redbox'
import Button from 'react-mdl/lib/Button'
import './DefaultDisplay.scss'

const redboxTarget = {
  drop (props, monitor, component) {
    const item = monitor.getItem()
    const delta = monitor.getDifferenceFromInitialOffset()
    const left = Math.round(item.left + delta.x)
    const top = Math.round(item.top + delta.y)

    component.moveRedbox(item.id, left, top)
  }
}

function collectTarget (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export class ChangeDetection extends Component {
  constructor (props) {
    super(props)
    this.addRedbox = this.addRedbox.bind(this)
    this.moveRedbox = this.moveRedbox.bind(this)
    this.grow = this.grow.bind(this)
    this.shrink = this.shrink.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    trial: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  }

  addRedbox () {
    const { id, trial, onChange } = this.props

    let isA = trial.trialSetting.onScreen === 'Image A'
    if (isA) {
      onChange(id,
        { changeA:
        {
          ...trial.trialSetting.changeA,
          [ (Object.keys(trial.trialSetting.changeA) + 1).toString() ] :
          { top: 0, left: 0, width: 100, height: 100 } } })
    } else {
      onChange(id,
        { changeB:
        {
          ...trial.trialSetting.changeB,
          [ (Object.keys(trial.trialSetting.changeB) + 1).toString() ] :
          { top: 0, left: 0, width: 100, height: 100 } } })
    }
  }

  moveRedbox (bid, left, top) {
    const { id, trial, onChange } = this.props

    let isA = trial.trialSetting.onScreen === 'Image A'

    if (isA) {
      onChange(id,
        { changeA:
        {
          ...trial.trialSetting.changeA,
          [bid] : { top: top, left: left, width: 100, height: 100 } } })
    } else {
      onChange(id,
        { changeB:
        {
          ...trial.trialSetting.changeB,
          [bid] : { top: top, left: left, width: 100, height: 100 } } })
    }
  }

  grow (bid) {
    const { id, trial, onChange } = this.props

    let isA = trial.trialSetting.onScreen === 'Image A'
    let box

    if (isA) {
      box = trial.trialSetting.changeA[bid]

      onChange(id,
        { changeA:
        {
          ...trial.trialSetting.changeA,
          [bid] : {
            ...box,
            width: box.width + 20,
            height: box.height + 20 } } })
    } else {
      box = trial.trialSetting.changeB[bid]

      onChange(id,
        { changeB:
        {
          ...trial.trialSetting.changeB,
          [bid] : {
            ...box,
            width: box.width + 20,
            height: box.height + 20 } } })
    }
  }

  shrink (bid) {
    const { id, trial, onChange } = this.props

    let isA = trial.trialSetting.onScreen === 'Image A'
    let box

    if (isA) {
      box = trial.trialSetting.changeA[bid]

      onChange(id,
        { changeA:
        {
          ...trial.trialSetting.changeA,
          [bid] : {
            ...box,
            width: box.width - 20,
            height: box.height - 20 } } })
    } else {
      box = trial.trialSetting.changeB[bid]

      onChange(id,
        { changeB:
        {
          ...trial.trialSetting.changeB,
          [bid] : {
            ...box,
            width: box.width - 20,
            height: box.height - 20 } } })
    }
  }

  render () {
    const { trial, connectDropTarget } = this.props

    let style = {}
    let itemStyle = {}
    let isA = trial.trialSetting.onScreen === 'Image A'

    if (isA) {
      switch (trial.trialSetting.alignHA) {
        case 'left':
          style.justifyContent = 'flex-start'
          break
        case 'center':
          style.justifyContent = 'center'
          break
        case 'right':
          style.justifyContent = 'flex-end'
          break
      }

      switch (trial.trialSetting.alignVA) {
        case 'top':
          itemStyle.alignSelf = 'flex-start'
          break
        case 'middle':
          itemStyle.alignSelf = 'center'
          break
        case 'bottom':
          itemStyle.alignSelf = 'flex-end'
          break
      }

      if (trial.trialSetting.widthA) {
        itemStyle.width = trial.trialSetting.widthA + 'px'
      }

      if (trial.trialSetting.heightA) {
        itemStyle.height = trial.trialSetting.heightA + 'px'
      }
    } else {
      switch (trial.trialSetting.alignHB) {
        case 'left':
          style.justifyContent = 'flex-start'
          break
        case 'center':
          style.justifyContent = 'center'
          break
        case 'right':
          style.justifyContent = 'flex-end'
          break
      }

      switch (trial.trialSetting.alignVB) {
        case 'top':
          itemStyle.alignSelf = 'flex-start'
          break
        case 'middle':
          itemStyle.alignSelf = 'center'
          break
        case 'bottom':
          itemStyle.alignSelf = 'flex-end'
          break
      }

      if (trial.trialSetting.widthB) {
        itemStyle.width = trial.trialSetting.widthB + 'px'
      }

      if (trial.trialSetting.heightB) {
        itemStyle.height = trial.trialSetting.heightB + 'px'
      }
    }

    let redBoxes = []
    let hashMap = isA ? trial.trialSetting.changeA : trial.trialSetting.changeB

    for (let key in hashMap) {
      redBoxes.push(
        <Redbox
          key={key}
          id={key}
          top={hashMap[key].top}
          left={hashMap[key].left}
          width={hashMap[key].width}
          height={hashMap[key].height}
          grow={() => { this.grow(key) }}
          shrink={() => { this.shrink(key) }} />
      )
    }

    return connectDropTarget(
      <div className='design_frames_default' style={style} >
        <img src={isA ? trial.trialSetting.imageA : trial.trialSetting.imageB} style={itemStyle} />
        <Button raised accent style={{ position:'absolute', zIndex: 1999 }}
          onClick={this.addRedbox}>{isA ? 'Add Redbox in A' : 'Add Redbox in B'}</Button>
        {redBoxes}
      </div>
    )
  }
}

export default DropTarget(ITEMTYPES.REDBOX, redboxTarget, collectTarget)(ChangeDetection)
