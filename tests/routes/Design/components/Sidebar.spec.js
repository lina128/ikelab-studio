import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from 'routes/Design/components/Sidebar'

describe('(Design/components) Sidebar', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Sidebar />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should has class design_sidebar_default.', () => {
    expect(_wrapper.hasClass('design_sidebar_default')).to.equal(true)
  })
})
