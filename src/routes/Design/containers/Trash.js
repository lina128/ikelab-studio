import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { toggleSelectMode } from '../modules/design'
import TrashcanImage from '../assets/delete.png'
import './Trash.scss'

const mapDispatchToProps = (dispatch) => {
	return {
		onSelectMode: () => {
			dispatch(toggleSelectMode('trash_sele_1', {}, 'remove'))
		}
	}
}

export class Trash extends Component {
	render() {
		const { onSelectMode } = this.props
		
		return (
			<div className={'design_trash_default'} id={'trash_sele_1'} onClick={onSelectMode}>
				<img alt={'Trash'} style={{display:'block'}} src={TrashcanImage} />
				Trash
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(Trash)