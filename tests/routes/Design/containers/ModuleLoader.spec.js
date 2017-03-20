import React from 'react'
import { shallow } from 'enzyme'
import { ModuleLoader } from 'routes/Design/containers/ModuleLoader'

describe('(Design/containers) ModuleLoader', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      addTrial: el => el,
      addBlock: el => el,
      addRun: el => el,
      addBlockTrials: el => el
    }
    _wrapper = shallow(<ModuleLoader {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a Menu Component', () => {
    expect(_wrapper.find('Menu')).to.exist
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
