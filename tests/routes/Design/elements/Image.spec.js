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
      trial: {
        id: 1,
        type: 'IMAGE',
        setting: setting
      }
    }

    _wrapper = shallow(<Image {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should contains an img.', () => {
    expect(_wrapper.find('img')).to.exist
  })
})
