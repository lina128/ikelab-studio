import React from 'react'
import { shallow } from 'enzyme'
import InputAreaField from 'routes/Design/elements/fields/InputAreaField'

describe('(Design/elements/fields) InputAreaField', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      trialId: 1,
      fieldConstantKey: 'fontSize',
      fieldConstant: {
        name: 'Font Size',
        hints: 'pt'
      },
      fieldSetting: 16,
      onChange: el => el
    }

    _wrapper = shallow(<InputAreaField {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a Textfield component.', () => {
    expect(_wrapper.find('Textfield')).to.have.length(1)
  })
})
