import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Textfield from 'react-mdl/lib/Textfield'
import Button from 'react-mdl/lib/Button'
import { addMessage } from '../../modules/design'
import superagent from 'superagent'
import './ImageField.scss'

const UPLOAD_PRESET = 'xcdgygdr'
const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ikelabrepo/image/upload'

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (txt) => {
      dispatch(addMessage(txt))
    }
  }
}

export class ImageField extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props || nextProps.dialogOpen === false) {
      this.setState({ value: '' })
    }
  }

  handleImageUpload (acceptedFiles) {
    this.setState({ value: '' })
    superagent.post(UPLOAD_URL)
      .field('upload_preset', UPLOAD_PRESET)
      .field('file', acceptedFiles[0])
      .field('tags', 'private,stimulus')
      .end((err, response) => {
        if (err || response.body.error) {
          this.props.addMessage('Image upload failed. Please try again.')
        } else {
          if (response.body.secure_url) {
            this.handleChange(response.body.secure_url)
          }
        }
      })
  }

  handleChange (url) {
    const { onChange, trialId, fieldConstantKey } = this.props
    if (typeof url === 'string') {
      onChange(trialId, { [fieldConstantKey]: url })
    } else {
      if (url.target.value !== '') {
        onChange(trialId, { [fieldConstantKey]: url.target.value })
      }
    }
  }

  handleInputChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    const { fieldConstant } = this.props

    return (
      <div>
        {fieldConstant.name}:
        <Dropzone
          className='design_imageField_default'
          multiple={false}
          accept='image/*'
          onDrop={this.handleImageUpload}>
          <div
            className='design_imageField_label'>
            <p>Drop an image here<br />
            or<br />
            click to select a file to upload.</p>
          </div>
        </Dropzone>
        <Textfield
          onChange={this.handleInputChange}
          onBlur={this.handleChange}
          label='Or paste an image URL here'
          floatingLabel
          value={this.state.value}
        />
        <Button raised ripple>Or pick one from your library</Button>
        {fieldConstant.hints}
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ImageField)
