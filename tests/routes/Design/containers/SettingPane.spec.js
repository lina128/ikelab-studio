import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
import { SettingPane } from 'routes/Design/containers/SettingPane'
import text from 'routes/Design/elements/settings/text'

function defaultSetting () {
  let setting = {}

  for (let s in text) {
    setting[s] = text[s].value
  }

  return setting
}

describe('(Design/components) SettingPane', () => {
  let _wrapper, _props, _spies
  let setting = defaultSetting()

  beforeEach(() => {
    _spies = {}

    _props = {
      id: 1,
      trial: {
        id: 1,
        type: 'TEXT',
        trialSetting: setting,
        screenshot: ''
      },
      ...bindActionCreators({
        handleChange: (_spies.handleChange = sinon.spy()),
        handleCopy: (_spies.handleCopy = sinon.spy()),
        handleDelete: (_spies.handleDelete = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }

    _wrapper = shallow(<SettingPane {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should dispatch an action when the copy button is clicked', () => {
    _spies.dispatch.should.have.not.been.called

    _wrapper.find('[name="control_point_duplicate"]').simulate('click')

    _spies.dispatch.should.have.been.called
    _spies.handleCopy.should.have.been.called
  })

  it('Should dispatch an action when the delete button is clicked', () => {
    _spies.dispatch.should.have.not.been.called

    _wrapper.find('[name="delete"]').simulate('click')

    _spies.dispatch.should.have.been.called
    _spies.handleDelete.should.have.been.called
  })
})
