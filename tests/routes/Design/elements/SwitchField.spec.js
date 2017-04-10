import React from 'react'
import { shallow } from 'enzyme'
import SwitchField from 'routes/Design/elements/fields/SwitchField'

describe('(Design/elements/fields) SwitchField', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      trialId: 1,
      fieldConstantKey: 'inputOption1',
      fieldConstant: {
        name: 'Input Option 1',
        hints: ''
      },
      fieldSetting: false,
      onChange: el => el
    }

    _wrapper = shallow(<SwitchField {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a Switch component.', () => {
    expect(_wrapper.find('Switch')).to.have.length(1)
  })
})
