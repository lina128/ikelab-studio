import React from 'react'
import { shallow } from 'enzyme'
import Image from 'routes/Design/elements/frames/Image'
import image from 'routes/Design/elements/settings/image'

function getSetting () {
  let setting = {}

  for (let s in image) {
    setting[s] = image[s].value
  }

  return setting
}

describe('(Design/elements/frames) Image', () => {
  let _wrapper, _props
  let setting = getSetting()

  beforeEach(() => {
    _props = {
      id: 1,
      trial: {
        type: 'IMAGE',
        trialSetting: setting
      }
    }

    _wrapper = shallow(<Image {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })
})
