import React from 'react'
import './defaultModule.scss'

const defaultModule = (trial) => {
	return (
		<div className = 'paradigm_defaultModule_default' >
			{trial.type}
		</div>
	)
}

export default defaultModule