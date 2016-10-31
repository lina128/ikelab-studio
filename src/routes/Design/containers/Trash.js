import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { toggleSelectMode } from '../modules/design'
import SquareButton from '../components/SquareButton'
import TrashcanImage from '../assets/delete.png'

const style = {
	display: "inline-block"
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSelectMode: () => {
			dispatch(toggleSelectMode('trash_sele_1', {}, 'remove'))
		}
	}
}

@connect(null, mapDispatchToProps)
export default class Trash extends Component {
	render() {
		const { onSelectMode } = this.props;
		return (
			<div style={style} id={'trash_sele_1'} onClick={onSelectMode}>
				<SquareButton customStyle={{backgroundImage: 'url(' + TrashcanImage + ')'}} />
				Trash
			</div>
		)
	}
}