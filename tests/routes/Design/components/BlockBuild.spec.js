import React from 'react'
import { shallow } from 'enzyme'
import BlockBuild from 'routes/Design/components/BlockBuild'

describe('(Design/components) BlockBuild', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<BlockBuild />)
  })

  it('Should render a Card component.', () => {
    expect(_wrapper.find('Card')).to.exist
  })
})
