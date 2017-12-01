import React, { PureComponent, PropTypes } from 'react'
import Button from 'react-mdl/lib/Button'
import TrialContainer from '../containers/TrialContainer'
import BlockContainer from '../containers/BlockContainer'
import RunContainer from '../containers/RunContainer'
import './DesignPane.scss'
import './Toolbar.scss'

export default class DesignPane extends PureComponent {
  static propTypes = {
    experiment: PropTypes.object.isRequired,
    moveNode: PropTypes.func.isRequired,
    moveInside: PropTypes.func.isRequired,
    moveOutside: PropTypes.func.isRequired,
    clickTrial: PropTypes.func.isRequired,
    copyCurrentTrial: PropTypes.func.isRequired,
    deleteCurrentTrial: PropTypes.func.isRequired
  }

  render () {
    const { experiment, moveNode,
           moveInside, moveOutside, clickTrial,
           copyCurrentTrial, deleteCurrentTrial } = this.props

    return (
      <div className='design_designPane_default'>
        <div className='design_designPane_pane'>
          {
            experiment.structure.map(x => {
              if (x.level === 'trial') {
                return <TrialContainer
                  key={x.id}
                  id={x.id}
                  currentTrial={experiment.currentTrial}
                  entity={experiment.entity}
                  moveNode={moveNode}
                  clickTrial={clickTrial} />
              }
              if (x.level === 'block') {
                return <BlockContainer
                  key={x.id}
                  id={x.id}
                  children={x.children}
                  currentTrial={experiment.currentTrial}
                  entity={experiment.entity}
                  moveNode={moveNode}
                  moveInside={moveInside}
                  clickTrial={clickTrial} />
              }
              if (x.level === 'run') {
                return <RunContainer
                  key={x.id}
                  id={x.id}
                  children={x.children}
                  currentTrial={experiment.currentTrial}
                  entity={experiment.entity}
                  moveNode={moveNode}
                  moveInside={moveInside}
                  clickTrial={clickTrial} />
              }
            })
          }
        </div>
        <div className='design_designPane_tools'>
          <Button onClick={copyCurrentTrial}>copy<i className='material-icons'>content_copy</i></Button>
          <Button onClick={deleteCurrentTrial}>delete<i className='material-icons'>delete_forever</i></Button>
          <Button onClick={moveOutside}>move out<i className='material-icons'>reorder</i></Button>
          <Button onClick={() => {}}>preview<i className='material-icons'>play_arrow</i></Button>
        </div>
      </div>
    )
  }
}
