import React from 'react'
import { mount } from 'enzyme'
import { TrialPane } from 'routes/Design/containers/TrialPane'

describe('(Design/component) TrialPane', () => {
  let _wrapper, _props, _spy

  before(() => {
    _spy = sinon.spy(TrialPane.prototype, 'componentDidUpdate')

    _props = {
      id: 0,
      trial: {},
      handleChange: el => el
    }
    _wrapper = mount(<TrialPane {..._props} />)
  })

  after(() => {
    _spy.restore()
  })

  it('Should render a Card.', () => {
    expect(_wrapper.find('Card')).to.have.length(1)
  })

  it('Should call componentDidUpdate when _props has changed.', () => {
    expect(_spy.calledOnce).to.be.false

    _wrapper.setProps({
      id: 1,
      trial: { condition: {} },
      handleChange: el => el
    })

    expect(_spy.calledOnce).to.be.true
  })
})
