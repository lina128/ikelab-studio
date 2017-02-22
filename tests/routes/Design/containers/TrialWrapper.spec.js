import React from 'react'
import { mount } from 'enzyme'
import { TrialWrapper } from 'routes/Design/containers/TrialWrapper'

describe('(Design/component) TrialWrapper', () => {
  let _wrapper, _props, _spy

  before(() => {
    _spy = sinon.spy(TrialWrapper.prototype, 'componentDidUpdate')

    _props = {
      trial: {},
      onChange: el => el
    }
    _wrapper = mount(<TrialWrapper {..._props} />)
  })

  after(() => {
    _spy.restore()
  })

  it('Should render a CenterFrame.', () => {
    expect(_wrapper.find('CenterFrame')).to.have.length(1)
  })

  it('Should call componentDidUpdate when _props has changed.', () => {
    expect(_spy.calledOnce).to.be.false

    _wrapper.setProps({
      trial: { id: 1 },
      onChange: el => el
    })

    expect(_spy.calledOnce).to.be.true
  })
})
