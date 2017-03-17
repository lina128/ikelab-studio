import React from 'react'
import { shallow } from 'enzyme'
import AbsolutePosition from 'routes/Design/components/AbsolutePosition'

describe('(Design/components) AbsolutePosition', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      left: '0px',
      top: '0px',
      width: '300px',
      isOpen: false
    }
    _wrapper = shallow(<AbsolutePosition {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should has class design_absolutePosition.', () => {
    expect(_wrapper.hasClass('design_absolutePosition')).to.equal(true)
  })

  it('Should have style left 0px.', () => {
    expect(_wrapper).to.have.style('left', '0px')
  })

  it('Should have style top 0px.', () => {
    expect(_wrapper).to.have.style('top', '0px')
  })

  it('Should change style according to props.', () => {
    _wrapper.setProps({ left:'100px' })
    expect(_wrapper).to.have.style('left', '100px')
  })
})
