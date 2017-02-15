import React, { Component } from 'react'
import ConditionPane from '../containers/ConditionPane'
import DesignPane from '../containers/DesignPane'
import './NavBar.scss'

export default class NavBar extends Component {
  render () {
    return (
      <div className={'design_navbar_default'}>
        <ConditionPane />
        <DesignPane />
      </div>
    )
  }
}
