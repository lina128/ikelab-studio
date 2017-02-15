import React from 'react'
import { shallow } from 'enzyme'
import SettingPane from 'routes/Design/components/SettingPane'

import { defaultType } from 'routes/Design/constants'
import { DEFAULTMODULE } from 'routes/Design/constants/field.constants'

function defaultSetting () {
  let setting = {}

  for (let s in DEFAULTMODULE) {
    setting[s] = DEFAULTMODULE[s].value
  }

  return setting
}

describe('(Design/components) SettingPane', () => {
  let _wrapper, _props
  let setting = defaultSetting()

  beforeEach(() => {
    _props = {
      trial: {
        id: 1,
        type: defaultType,
        setting: setting,
        screenshot: ''
      },
      onChange: () => {}
    }

    _wrapper = shallow(<SettingPane {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })
})
