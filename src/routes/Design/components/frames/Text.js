import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import './Text.scss'

export default class Text extends Component {
	constructor(props) {
		super(props);
		this.state = { editorState: EditorState.createWithContent(ContentState.createFromText(this.props.trial.setting.content)) };
		this.focus = () => this.refs.editor.focus();
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}
	
	static propTypes = {
		trial: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired
	}
	
	handleChange = (editorState) => this.setState({editorState})
	
	handleBlur() {
		const { trial, onChange } = this.props;
		onChange(trial.id, {content: this.state.editorState.getCurrentContent().getPlainText()});
	}
	
	componentWillReceiveProps(nextProps) {
		if(this.props != nextProps) {
			const newContentState = ContentState.createFromText(nextProps.trial.setting.content);
			const editorState = EditorState.push(this.state.editorState, newContentState);
			this.setState({editorState})
		}
	}

	render() {
		const { trial } = this.props;
		
		const customStyle = {
			fontFamily: trial.setting.font,
			fontSize: trial.setting.fontSize + 'pt',
			fontWeight: trial.setting.fontWeight,
			color: trial.setting.fontColor,
			justifyContent: 'center',
			alignItems: 'center',
		}
		
		switch(trial.setting.alignH) {
		case 'left':
			customStyle.justifyContent = 'flex-start';
			break;
		case 'right':
			customStyle.justifyContent = 'flex-end';
			break;
		default:
			break;
		}
		
		switch(trial.setting.alignV) {
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
				<Editor editorState={this.state.editorState} onChange={this.handleChange} onBlur={this.handleBlur} placeholder="Enter some text..." ref="editor" />
			</div>
		)
	}
}