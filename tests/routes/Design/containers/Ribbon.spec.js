import React from 'react'
import { shallow } from 'enzyme'
import { Ribbon } from 'routes/Design/containers/Ribbon'

describe('(Design/containers) Ribbon', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      addTrial: el => el,
      addBlock: el => el,
      addRun: el => el,
      addCondition: el => el
    }
    _wrapper = shallow(<Ribbon {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have class design_ribbon_default.', () => {
    expect(_wrapper.hasClass('design_ribbon_default')).to.equal(true)
  })

  it('Should have 4 AddButton components.', () => {
    expect(_wrapper.find('AddButton')).to.have.length(4)
  })
})
