import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { uploadImage } from '../../modules/design'
import Textfield from 'react-mdl/lib/Textfield'
import Button from 'react-mdl/lib/Button'
import './ImageField.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (file) => {
      dispatch(uploadImage(file))
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
    uploadImage: PropTypes.func.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props || nextProps.dialogOpen === false) {
      this.setState({ value: '' })
    }
  }

  handleImageUpload (acceptedFiles) {
    this.setState({ value: '' })
    this.props.uploadImage(acceptedFiles[0])
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
