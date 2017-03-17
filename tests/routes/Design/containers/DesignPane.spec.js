import React from 'react'
import { shallow } from 'enzyme'
import { DesignPane } from 'routes/Design/containers/DesignPane'

describe('(Design/container) DesignPane', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      selectMode: false,
      structure: [],
      onNodeMove: () => {},
      onMoveOutside: () => {},
      onMoveInside: () => {},
      onClickTrial: () => {},
      onSelectTrial: () => {},
      onChangeBlockSetting: () => {},
      onChangeRunSetting: () => {},
      onDeleteNode: () => {}
    }
    _wrapper = shallow(<DesignPane {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have class design_designPane_default.', () => {
    expect(_wrapper.hasClass('design_designPane_default')).to.equal(true)
  })
})
