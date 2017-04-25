import React, { PureComponent, PropTypes } from 'react'
import TrialContainer from '../containers/TrialContainer'
import BlockContainer from '../containers/BlockContainer'
import RunContainer from '../containers/RunContainer'
import './DesignPane.scss'

export default class DesignPane extends PureComponent {
  static propTypes = {
    structure: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired,
    changeStructure: PropTypes.func.isRequired,
    moveNode: PropTypes.func.isRequired,
    moveInside: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired,
    changeSetting: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired
  }

  componentDidUpdate () {
    const { changeStructure } = this.props
    changeStructure()
  }

  render () {
    const { structure, entity, moveNode,
           moveInside, clickTrial, changeSetting,
           deleteNode } = this.props

    return (
      <div className={'design_designPane_default'}>
        {
        structure.map(x => {
          if (x.level === 'trial') {
            return <TrialContainer
              key={x.id}
              id={x.id}
              branchStyle={''}
              entity={entity}
              moveNode={moveNode}
              clickTrial={clickTrial} />
          }
          if (x.level === 'block') {
            return <BlockContainer
              key={x.id}
              id={x.id}
              branchStyle={''}
              children={x.children}
              entity={entity}
              moveNode={moveNode}
              moveInside={moveInside}
              changeSetting={changeSetting}
              deleteNode={deleteNode}
              clickTrial={clickTrial} />
          }
          if (x.level === 'run') {
            return <RunContainer
              key={x.id}
              id={x.id}
              children={x.children}
              entity={entity}
              moveNode={moveNode}
              moveInside={moveInside}
              changeSetting={changeSetting}
              deleteNode={deleteNode}
              clickTrial={clickTrial} />
          }
        })
      }
      </div>
    )
  }
}
