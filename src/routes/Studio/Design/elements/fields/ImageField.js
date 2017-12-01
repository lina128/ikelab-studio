import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { uploadImage } from '../../modules/design'
import Textfield from 'react-mdl/lib/Textfield'
import Button from 'react-mdl/lib/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl/lib/Dialog'
import './field.scss'
import './ImageField.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (id, key, file) => {
      dispatch(uploadImage(id, key, file))
    }
  }
}

export class ImageField extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      dialogOpen: false,
      mode: 'upload'
    }
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.setUpload = this.setUpload.bind(this)
    this.setURL = this.setURL.bind(this)
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
      this.handleCloseDialog()
    }
  }

  handleImageUpload (acceptedFiles) {
    const { trialId, fieldConstantKey, uploadImage } = this.props
    uploadImage(trialId, fieldConstantKey, acceptedFiles[0])
  }

  handleChange (url) {
    const { onChange, trialId, fieldConstantKey } = this.props
    onChange(trialId, { [fieldConstantKey]: url.target.value })
  }

  handleInputChange (event) {
    this.setState({
      ...this.state,
      value: event.target.value
    })
  }

  handleOpenDialog () {
    this.setState({
      ...this.state,
      dialogOpen: true
    })
  }

  handleCloseDialog () {
    this.setState({
      ...this.state,
      value: '',
      dialogOpen: false,
      mode: 'upload'
    })
  }

  setUpload () {
    this.setState({
      ...this.state,
      mode: 'upload'
    })
  }

  setURL () {
    this.setState({
      ...this.state,
      mode: 'url'
    })
  }

  render () {
    const { fieldConstant } = this.props
    console.log(this.state)
    let mode
    switch (this.state.mode) {
      case 'upload':
        mode = <Dropzone
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
        break
      case 'url':
        mode = <div className='design_urlField_default'>
          <Textfield
            className='design_urlField_textfield'
            onChange={this.handleInputChange}
            onBlur={this.handleChange}
            label='Paste an image URL here'
            floatingLabel
            value={this.state.value}
          />
        </div>
        break
      default:
        mode = <Dropzone
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
        break
    }

    return (
      <div className='design_field_default'>
        <div className='design_field_field'>
          {fieldConstant.name}
        </div>
        <div className='design_field_field'>
          <Button onClick={this.handleOpenDialog}>Add</Button>
          {fieldConstant.hints}
        </div>
        <Dialog className='design_imageField_dialog' open={this.state.dialogOpen}>
          <DialogTitle>
            Insert Image
          </DialogTitle>
          <DialogContent>
            <div>
              <Button onClick={this.setUpload}>Upload</Button>
              <Button onClick={this.setURL}>By URL</Button>
            </div>
            <div className='design_imageField_box'>
              {mode}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ImageField)
