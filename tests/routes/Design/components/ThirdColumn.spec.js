import React from 'react'
import { shallow } from 'enzyme'
import ThreeColumn from 'routes/Design/components/ThirdColumn'

describe('(Design/components) ThreeColumn', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<ThreeColumn />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should has class design_thirdColumn_default.', () => {
    expect(_wrapper.hasClass('design_thirdColumn_default')).to.equal(true)
  })
})
