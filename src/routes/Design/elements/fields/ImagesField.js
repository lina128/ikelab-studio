import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import Textfield from 'react-mdl/lib/Textfield'
import superagent from 'superagent'
import { UPLOAD_PRESET, UPLOAD_URL } from '../../constants'
import './ImagesField.scss'

export default class ImagesField extends Component {
  constructor (props) {
    super(props)
    this.state = { uploaded: 0, files: [], value: '' }
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleInputUpload = this.handleInputUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    dialogOpen: PropTypes.bool
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dialogOpen === false) {
      this.setState({ uploaded: 0, files: [], value: '' })
    }
  }

  handleImageUpload (acceptedFiles) {
    this.setState({ uploaded: 0, files: [], value: '' })
    acceptedFiles.map((file) => {
      superagent.post(UPLOAD_URL)
      .field('upload_preset', UPLOAD_PRESET)
      .field('file', file)
      .field('tags', 'private,stimulus')
      .end((err, response) => {
        let uploaded = this.state.uploaded + 1

        if (err || response.body.error) {
          this.setState({ uploaded: uploaded, files: [ ...this.state.files, '' ] }, () => {
            if (this.state.uploaded === acceptedFiles.length) {
              this.handleChange()
            }
          })
        } else {
          if (response.body.secure_url) {
            this.setState({ uploaded: uploaded, files: [ ...this.state.files, response.body.secure_url ] }, () => {
              if (this.state.uploaded === acceptedFiles.length) {
                this.handleChange()
              }
            })
          }
        }
      })
    })
  }

  handleInputUpload (event) {
    const f = event.target.value.trim().split(/\s+/)
    const files = []
    for (let i = 0; i < f.length; i++) {
      if (f[i]) {
        files.push(f[i])
      }
    }
    this.setState({ uploaded: files.length, files: files }, this.handleChange)
  }

  handleChange () {
    const { onChange, trialId, fieldConstantKey } = this.props
    onChange(trialId, { [fieldConstantKey]: this.state.files })
  }

  handleInputChange (event) {
    this.setState({ ...this.state, value: event.target.value })
  }

  render () {
    const { fieldConstant } = this.props

    let preview = this.state.files ? this.state.files.map(
      (file, idx) => <div key={idx} className='design_imagesField_thumbnail'><img src={file} /></div>) : null

    return (
      <div>
        {fieldConstant.name}:
        <Dropzone
          className='design_imagesField_default'
          multiple
          accept='image/*'
          onDrop={this.handleImageUpload}>
          <div
            className='design_imagesField_label'>
            <p>Drop images here<br />
            or<br />
            click to select images to upload.</p>
          </div>
        </Dropzone>
        <Textfield
          onChange={this.handleInputChange}
          onBlur={this.handleInputUpload}
          label='Or paste image URLs seperated with whitespace'
          floatingLabel
          rows={3}
          value={this.state.value}
        />
        Preview: Uploaded {this.state.files.length} images
        <div className='design_imagesField_preview'>
          {preview}
        </div>
        {fieldConstant.hints}
      </div>
    )
  }
}
