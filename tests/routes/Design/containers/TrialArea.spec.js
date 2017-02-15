import React from 'react'
import { shallow } from 'enzyme'
import { TrialArea } from 'routes/Design/containers/TrialArea'

describe('(Design/contianers) TrialArea', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      currentTrialObject: {},
      handleChange: el => el
    }
    _wrapper = shallow(<TrialArea {..._props} />)
  })

  it('Should render a .design_trialArea_default.', () => {
    expect(_wrapper.find('.design_trialArea_default')).to.exist
  })
})
