import React from 'react'
import { shallow } from 'enzyme'
import { MessageBar } from 'routes/Design/containers/MessageBar'

describe('(Design/component) MessageBar', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      messages: ['Loading']
    }
    _wrapper = shallow(<MessageBar {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have class design_messageBar_default.', () => {
    expect(_wrapper.hasClass('design_messageBar_default')).to.equal(true)
  })

  it('Should render one message.', () => {
    expect(_wrapper.children()).to.have.length(1)
    expect(_wrapper.childAt(0).text()).to.match(/Loading/)
  })
})
