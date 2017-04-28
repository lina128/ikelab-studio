import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import uniqueId from 'lodash/uniqueId'
import Textfield from 'react-mdl/lib/Textfield'
import Button from 'react-mdl/lib/Button'
import { addMessage } from '../../../../store/message'
import './ImageField.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (id, msg) => {
      dispatch(addMessage(id, msg))
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
    const { addMessage } = this.props

    this.setState({ value: '' })
    let that = this
    let file = acceptedFiles[0]

    fetch(`${__IKELAB_IMAGEUPLOAD__}/requestUploadURL`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json().then(json => fetch(json.uploadURL, {
          mode: 'cors',
          method: 'PUT',
          body: file
        }))
      } else {
        if (response.status === 400) {
          return Promise.reject({ message: 'Image too large.' })
        } else {
          return Promise.reject({ message: 'Error uploading image.' })
        }
      }
    })
    .then(response => that.handleChange(`${__IKELAB_IMAGES_STORE__}/${file.name}`),
          error => addMessage(uniqueId(), error.message))
    .catch(error => {
      console.log(error)
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
