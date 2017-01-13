import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import './Text.scss'

export default class Text extends Component {
	constructor(props) {
		super(props);
		this.state = { editorState: EditorState.createWithContent(ContentState.createFromText(this.props.trial.setting.content.value)) }
		this.focus = () => this.refs.editor.focus()
		this.onChange = this.handleChange.bind(this)
	}
	
	static propTypes = {
		trial: PropTypes.object.isRequired
	}
	
	handleChange = (editorState) => this.setState({editorState})

	render() {
		const { trial } = this.props
		
		const customStyle = {
			font: trial.setting.font.value,
			fontSize: trial.setting.fontSize.value + 'pt',
			fontWeight: trial.setting.fontWeight.value,
			color: trial.setting.fontColor.value,
			justifyContent: 'center',
			alignItems: 'center',
		}
		
		switch(trial.setting.alignH.value) {
		case 'left':
			customStyle.justifyContent = 'flex-start';
			break;
		case 'right':
			customStyle.justifyContent = 'flex-end';
			break;
		default:
			break;
		}
		
		switch(trial.setting.alignV.value) {
		case 'top':
			customStyle.alignItems = 'flex-start';
			break;
		case 'bottom':
			customStyle.alignItems = 'flex-end';
			break;
		default:
			break;
		}
		
		return (
			<div className="design_Text_editor" style={customStyle} onClick={this.focus}>
				<Editor editorState={this.state.editorState} onChange={this.onChange} placeholder="Enter some text..." ref="editor" />
			</div>
		)
	}
}