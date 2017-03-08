import React from 'react'
import { shallow } from 'enzyme'
import ImagesField from 'routes/Design/elements/fields/ImagesField'

describe('(Design/elements/fields) ImagesField', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      trialId: 1,
      fieldConstantKey: 'images',
      fieldConstant: {
        name: 'Images',
        hints: ''
      },
      fieldSetting: [],
      onChange: el => el
    }

    _wrapper = shallow(<ImagesField {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a Dropzone component.', () => {
    expect(_wrapper.find('Dropzone')).to.have.length(1)
  })

  it('Should have a Textfield component.', () => {
    expect(_wrapper.find('Textfield')).to.have.length(1)
  })
})
