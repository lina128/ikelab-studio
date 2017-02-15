import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Ribbon from '../containers/Ribbon'
import NavBar from './NavBar'
import TrialArea from '../containers/TrialArea'
import Note from '../containers/Note'
import './Design.scss'

export class App extends Component {
  render () {
    return (
      <div className='design_container1'>
        <Ribbon />
        <div className='design_container2'>
          <NavBar />
          <TrialArea />
        </div>
        <Note />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
