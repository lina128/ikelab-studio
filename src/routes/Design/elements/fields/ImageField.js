import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import superagent from 'superagent'
import './ImageField.scss'

const UPLOAD_PRESET = 'xcdgygdr'
const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ikelabrepo/image/upload'

export default class ImageField extends Component {
  constructor (props) {
    super(props)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    trialId: PropTypes.number.isRequired,
    fieldConstant: PropTypes.object.isRequired,
    fieldConstantKey: PropTypes.string.isRequired,
    fieldSetting: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleImageUpload (acceptedFiles) {
    superagent.post(UPLOAD_URL)
      .field('upload_preset', UPLOAD_PRESET)
      .field('file', acceptedFiles[0])
      .field('tags', 'private,stimulus')
      .end((err, response) => {
        if (err || response.body.error) {
          let message = response.body.error ? response.body.error.message : 'Image upload failed. Please try again.'
          console.log(message)
        } else {
          if (response.body.secure_url) {
            this.handleChange(response.body.secure_url)
          }
        }
      })
  }

  handleChange (url) {
    const { onChange, trialId, fieldConstantKey } = this.props
    onChange(trialId, { [fieldConstantKey]: url })
  }

  render () {
    const { fieldConstant, fieldSetting } = this.props

    return (
      <div>
        {fieldConstant.name}:
        <Dropzone
          className='design_imageField_default'
          multiple={false}
          accept='image/*'
          onDrop={this.handleImageUpload}>
          <img src={fieldSetting} />
        </Dropzone>
      </div>
    )
  }
}
