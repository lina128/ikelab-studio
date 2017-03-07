import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Ribbon from '../containers/Ribbon'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'
import DesignPane from '../containers/DesignPane'
import TrialBar from '../containers/TrialBar'
import TrialPane from '../containers/TrialPane'
import SettingPane from '../containers/SettingPane'
import Note from './Note'
import './Design.scss'

export class App extends Component {
  render () {
    return (
      <div className='design_container1'>
        <Ribbon />
        <div className='design_container2'>
          <FirstColumn>
            <DesignPane />
          </FirstColumn>
          <ThirdColumn>
            <SettingPane />
          </ThirdColumn>
          <SecondColumn>
            <TrialBar />
            <TrialPane />
          </SecondColumn>
        </div>
        <Note />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
