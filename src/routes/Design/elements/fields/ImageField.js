import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import Textfield from 'react-mdl/lib/Textfield'
import Button from 'react-mdl/lib/Button'
import ImageLibrary from '../../containers/ImageLibrary'
import superagent from 'superagent'
import './ImageField.scss'

const UPLOAD_PRESET = 'xcdgygdr'
const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ikelabrepo/image/upload'

export default class ImageField extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '', openDialog: false }
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        ...this.state,
        value: '' })
    }
  }

  showMessage (message) {
    document.getElementById('messageBox').innerHTML = message
  }

  hideMessage () {
    document.getElementById('messageBox').innerHTML = ''
  }

  handleImageUpload (acceptedFiles) {
    this.setState({
      ...this.state,
      value: '' })
    superagent.post(UPLOAD_URL)
      .field('upload_preset', UPLOAD_PRESET)
      .field('file', acceptedFiles[0])
      .field('tags', 'private,stimulus')
      .end((err, response) => {
        if (err || response.body.error) {
          let message = response.body.error ? response.body.error.message : 'Image upload failed. Please try again.'
          this.showMessage(message)
          setTimeout(this.hideMessage, 2000)
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
        let img = new Image()
        img.src = url.target.value
        img.onload = () => {
          onChange(trialId, { [fieldConstantKey]: img.src })
        }
        img.onerror = () => {
          let message = 'Image does not exist.'
          this.showMessage(message)
          setTimeout(this.hideMessage, 2000)
        }
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
        <ImageLibrary />
        {fieldConstant.hints}
      </div>
    )
  }
}
