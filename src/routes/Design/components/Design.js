import React, { Component, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Ribbon from '../containers/Ribbon'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'
import DesignPane from '../containers/DesignPane'
import TrialPane from '../containers/TrialPane'
import SettingPane from '../containers/SettingPane'
import MessageBar from '../containers/MessageBar'
import './Design.scss'

export class App extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className='design_container1'>
        {this.props.children}
        <Ribbon />
        <div className='design_container2'>
          <FirstColumn>
            <DesignPane />
          </FirstColumn>
          <ThirdColumn>
            <SettingPane />
          </ThirdColumn>
          <SecondColumn>
            <TrialPane />
          </SecondColumn>
        </div>
        <MessageBar />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
