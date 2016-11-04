import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Ribbon from '../containers/Ribbon'
import NavBar from '../containers/NavBar'
import TrialArea from '../containers/TrialArea'
import SettingPane from '../containers/SettingPane'
import Note from '../containers/Note'

@DragDropContext(HTML5Backend)
export default class App extends Component {
	render() {
		return (
			<div>
				<Ribbon />
				<NavBar />
				<TrialArea />
				<SettingPane />
				<Note />
			</div>
		)
	}
}