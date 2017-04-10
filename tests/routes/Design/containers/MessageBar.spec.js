import React from 'react'
import { shallow } from 'enzyme'
import { MessageBar } from 'routes/Design/containers/MessageBar'

describe('(Design/component) MessageBar', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      messages: [{ id:'1', html:'Loading' }],
      addMessage: el => el,
      deleteMessage: el => el
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
    expect(_wrapper.find('Message')).to.exist
  })
})
