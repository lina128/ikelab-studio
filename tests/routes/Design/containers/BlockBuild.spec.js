import React from 'react'
import { shallow } from 'enzyme'
import BlockBuild from 'routes/Design/containers/BlockBuild'

describe('(Design/containers) BlockBuild', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<BlockBuild />)
  })

  it('Should render a Card component.', () => {
    expect(_wrapper.find('Card')).to.exist
  })
})
