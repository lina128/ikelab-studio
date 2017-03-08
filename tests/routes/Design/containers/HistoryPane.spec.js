import React from 'react'
import { shallow } from 'enzyme'
import { HistoryPane } from 'routes/Design/containers/HistoryPane'

describe('(Design/containers) HistoryPane', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      wizards: [],
      addBlockTrials: el => el
    }
    _wrapper = shallow(<HistoryPane {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a List Component', () => {
    expect(_wrapper.find('List')).to.exist
  })

  it('Should have a Dialog Component.', () => {
    expect(_wrapper.find('Dialog')).to.exist
  })

  it('When openWizard is called, Dialog should open.', () => {
    _wrapper.instance().openWizard()
    _wrapper.update()
    expect(_wrapper.find('Dialog').props().open).to.equal(true)
  })
})
