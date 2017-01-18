import React, { Component, PropTypes } from 'react'
import './SettingPane.scss'
import DefaultCard from './cards/DefaultCard'
import ListCard from './cards/ListCard'

// ------------------------------------
// Constants
// ------------------------------------
export const DEFAULT = 'DEFAULTCARD'
export const LIST = 'List'

// ------------------------------------
// Card Handlers
// ------------------------------------
export const Cards = {
	[DEFAULT]: DefaultCard,
	[LIST]: ListCard
}

export default class SettingPane extends Component {
	static propTypes = {
		trial: PropTypes.object
	}
	
	render() {
		const { trial } = this.props;
		
		if(trial) {
			let MyCard, cardList = [], key=1;

			for(let s in trial.setting) {
				MyCard = Cards[trial.setting[s].type] || Cards[DEFAULT];
				if(trial.setting[s].display) {
					cardList.push(<MyCard key={key} setting={trial.setting[s]} />);
				}
				key++;
			}

			return (
				<div className={'design_settingPane_default'}>
					{cardList}
				</div>
			)
		} else {
			return (
				<div className={'design_settingPane_default'} />
			)
		}
	}
}