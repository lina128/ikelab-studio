import React, { PureComponent, PropTypes } from 'react'
import TrialContainer from '../containers/TrialContainer'
import BlockContainer from '../containers/BlockContainer'
import RunContainer from '../containers/RunContainer'
import './DesignPane.scss'

export default class DesignPane extends PureComponent {
  static propTypes = {
    structure: PropTypes.array.isRequired,
    changeStructure: PropTypes.func.isRequired,
    onNodeMove: PropTypes.func.isRequired,
    onMoveOutside: PropTypes.func.isRequired,
    onMoveInside: PropTypes.func.isRequired,
    onClickTrial: PropTypes.func.isRequired,
    onChangeBlockSetting: PropTypes.func.isRequired,
    onChangeRunSetting: PropTypes.func.isRequired,
    onDeleteNode: PropTypes.func.isRequired
  }

  componentDidUpdate () {
    const { structure, changeStructure } = this.props
    changeStructure(structure)
  }

  render () {
    const { structure, onNodeMove, onMoveOutside,
           onMoveInside, onClickTrial, onChangeBlockSetting,
           onChangeRunSetting, onDeleteNode } = this.props

    return (
      <div className={'design_designPane_default'}>
        {
        structure.map(x => {
          if (x.level === 'trial') {
            return <TrialContainer
              key={x.id}
              id={x.id}
              screenshot={x.screenshot}
              condition={x.condition}
              moveNode={onNodeMove}
              moveOutside={onMoveOutside}
              clickTrial={onClickTrial} />
          }
          if (x.level === 'block') {
            return <BlockContainer
              key={x.id}
              id={x.id}
              color={x.color}
              name={x.name}
              setting={x.setting}
              children={x.children}
              moveNode={onNodeMove}
              moveOutside={onMoveOutside}
              moveInside={onMoveInside}
              changeSetting={onChangeSetting}
              deleteNode={onDeleteNode}
              clickTrial={onClickTrial} />
          }
          if (x.level === 'run') {
            return <RunContainer
              key={x.id}
              id={x.id}
              name={x.name}
              setting={x.setting}
              children={x.children}
              moveNode={onNodeMove}
              moveOutside={onMoveOutside}
              moveInside={onMoveInside}
              changeSetting={onChangeSetting}
              deleteNode={onDeleteNode}
              clickTrial={onClickTrial} />
          }
        })
      }
      </div>
    )
  }
}
