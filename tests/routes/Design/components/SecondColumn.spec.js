import React from 'react'
import { shallow } from 'enzyme'
import SecondColumn from 'routes/Design/components/SecondColumn'

describe('(Component) SecondColumn', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<SecondColumn />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should has class design_secondColumn_default.', () => {
    expect(_wrapper.hasClass('design_secondColumn_default')).to.equal(true)
  })
})
