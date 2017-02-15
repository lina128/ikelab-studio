import React from 'react'
import { shallow } from 'enzyme'
import DefaultField from 'routes/Design/components/fields/DefaultField'

describe('(Design/components/fields) DefaultField', () => {
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

    _wrapper = shallow(<DefaultField {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })
})
