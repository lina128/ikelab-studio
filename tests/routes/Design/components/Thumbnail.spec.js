import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
import Thumbnail from 'routes/Design/components/Thumbnail'

describe('(Design/components) Thumbnail', () => {
  let _wrapper, _props, _spies

  beforeEach(() => {
    _spies = {}
    _props = {
      id: 1,
      ...bindActionCreators({
        onThumbnailClick: (_spies.onThumbnailClick = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Thumbnail {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have class design_thumbnail_default.', () => {
    expect(_wrapper.hasClass('design_thumbnail_default')).to.equal(true)
  })

  it('Should dispatch an action on click.', () => {
    _spies.dispatch.should.have.not.been.called

    _wrapper.find('div').simulate('click')
    _spies.onThumbnailClick.should.have.been.called
    _spies.dispatch.should.have.been.called
  })
})
