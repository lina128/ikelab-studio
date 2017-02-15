import React from 'react'
import { shallow } from 'enzyme'
import ListField from 'routes/Design/components/fields/ListField'

describe('(Design/components/fields) ListField', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      trialId: 1,
      fieldConstantKey: 'fontFamily',
      fieldConstant: {
        name: 'Font',
        options: ['Arial', 'Courier', 'Times'],
        hints: ''
      },
      fieldSetting: 16,
      onChange: el => el
    }

    _wrapper = shallow(<ListField {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a Menu component.', () => {
    expect(_wrapper.find('Menu')).to.have.length(1)
    expect(_wrapper.find('MenuItem')).to.have.length(3)
  })
})
