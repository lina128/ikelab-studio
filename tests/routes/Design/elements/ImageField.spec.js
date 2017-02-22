import React from 'react'
import { shallow } from 'enzyme'
import ImageField from 'routes/Design/elements/fields/ImageField'

describe('(Design/elements/fields) ImageField', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      trialId: 1,
      fieldConstantKey: 'image',
      fieldConstant: {
        name: 'Image',
        hints: ''
      },
      fieldSetting: '',
      onChange: el => el
    }

    _wrapper = shallow(<ImageField {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a Dropzone component.', () => {
    expect(_wrapper.find('Dropzone')).to.have.length(1)
  })
})
