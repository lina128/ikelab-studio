import React from 'react'
import { shallow } from 'enzyme'
import DefaultDisplay from 'routes/Design/components/frames/DefaultDisplay'
import { defaultType } from 'routes/Design/constants'
import { DEFAULTMODULE } from 'routes/Design/constants/field.constants'

function defaultSetting () {
  let setting = {}

  for (let s in DEFAULTMODULE) {
    setting[s] = DEFAULTMODULE[s].value
  }

  return setting
}

describe('(Design/components/frames) DefaultDisplay', () => {
  let _wrapper, _props
  let setting = defaultSetting()

  beforeEach(() => {
    _props = {
      trial: {
        id: 1,
        type: defaultType,
        setting: setting
      }
    }

    _wrapper = shallow(<DefaultDisplay {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })
})
