import React from 'react'
import { shallow } from 'enzyme'
import StudioView from 'routes/Studio/components/StudioView'

describe('(Studio/components) StudioView', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      experiments: [
        {
          experiment_id: 1,
          name: 'New Experiment'
        }
      ]
    }
    _wrapper = shallow(<StudioView {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render a list.', () => {
    expect(_wrapper.find('ul')).to.exist
  })

  it('Should render one experiment.', () => {
    expect(_wrapper.find('li')).to.have.length(1)
  })
})
