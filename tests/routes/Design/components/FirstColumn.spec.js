import React from 'react'
import { shallow } from 'enzyme'
import FirstColumn from 'routes/Design/components/FirstColumn'

describe('(Component) FirstColumn', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<FirstColumn />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should has class design_firstColumn_default.', () => {
    expect(_wrapper.hasClass('design_firstColumn_default')).to.equal(true)
  })
})
