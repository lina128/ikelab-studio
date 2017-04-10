import React from 'react'
import { shallow } from 'enzyme'
import MultiSelectListField from 'routes/Design/elements/fields/MultiSelectListField'

describe('(Design/elements/fields) MultiSelectListField', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      trialId: 1,
      fieldConstantKey: 'keys',
      fieldConstant: {
        name: 'Keys',
        hints: '',
        options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
          'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
          'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      },
      fieldSetting: [],
      onChange: el => el
    }

    _wrapper = shallow(<MultiSelectListField {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a MultiSelectField component.', () => {
    expect(_wrapper.find('MultiSelectField')).to.have.length(1)
  })
})
