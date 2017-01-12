import React from 'react'
import './text.scss'

const text = (trial) => {
	const style = {
		fontFamily: trial.setting.font.value,
		fontSize: trial.setting.fontSize.value + 'pt',
		fontWeight: trial.setting.fontWeight.value,
		color: trial.setting.fontColor.value
	}
	
	let alignH
	
	switch(trial.setting.alignH.value) {
	case 'left':
		alignH = {
			marginRight: 'auto'
		}
		break;
	case 'center':
		alignH = {
			margin: 'auto'
		}
		break;
	case 'right':
		alignH = {
			marginLeft: 'auto'
		}
		break;
	default:
		alignH = {
			margin: 'auto'
		}
		break;
	}
	
	let alignV
	
	switch(trial.setting.alignV.value) {
	case 'top':
		alignV = {
			marginBottom: 'auto'
		}
		break;
	case 'middle':
		alignV = {
			margin
		}
	}
	
	return (
		<div style={{style}}>
			{trial.setting.content}
		</div>
	)
}

export default text