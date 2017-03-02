import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import classnames from 'classnames'
import './TEXT.scss'

export default class Text extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(
          this.props.trial.setting.content)) }
    this.focus = () => this.refs.editor.focus()
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  static propTypes = {
    trial: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      const newContentState = ContentState.createFromText(nextProps.trial.setting.content)
      const editorState = EditorState.push(this.state.editorState, newContentState)
      this.setState({ editorState })
    }
  }

  handleChange = (editorState) => this.setState({ editorState })

  handleBlur () {
    const { trial, onChange } = this.props
    onChange(trial.id, { content: this.state.editorState.getCurrentContent().getPlainText() })
  }

  render () {
    const { trial } = this.props

    const classNames = classnames('design_frames_default', 'design_frames_Text_editor')

    const customStyle = {
      fontFamily: trial.setting.font,
      fontSize: trial.setting.fontSize + 'pt',
      fontWeight: trial.setting.fontWeight,
      color: trial.setting.fontColor,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      lineHeight: 1.5
    }

    return (
      <div className={classNames} style={customStyle} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder='Enter some text...'
          ref='editor' />
      </div>
    )
  }
}
