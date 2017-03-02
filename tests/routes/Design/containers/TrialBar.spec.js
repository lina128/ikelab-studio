import React from 'react'
import { shallow } from 'enzyme'
import { TrialBar } from 'routes/Design/containers/TrialBar'

describe('(Design/component) TrialBar', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      trial: {
        id: 1,
        level: 'trial',
        selected: false,
        condition: ['#3498db'],
        screenshot: null
      },
      removeTrialCondition: el => el
    }
    _wrapper = shallow(<TrialBar {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render Chips when trial.condition is not empty.', () => {
    expect(_wrapper.find('Chip')).to.have.length(1)
  })
})
