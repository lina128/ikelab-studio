import React from 'react'
import { shallow } from 'enzyme'
import Text from 'routes/Design/elements/frames/Text'

import text from 'routes/Design/elements/settings/text'

function defaultSetting () {
  let setting = {}

  for (let s in text) {
    setting[s] = text[s].value
  }

  return setting
}

describe('(Design/components/frames) Text', () => {
  let _wrapper, _props
  let setting = defaultSetting()

  beforeEach(() => {
    _props = {
      trial: {
        id: 1,
        type: 'TEXT',
        setting: setting,
        screenshot: ''
      },
      onChange: el => el
    }

    _wrapper = shallow(<Text {..._props} />)
  })

  it('Should render as a div.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should have a class design_Text_editor.', () => {
    expect(_wrapper.hasClass('design_Text_editor')).to.equal(true)
  })

  it('Should have an Editor.', () => {
    expect(_wrapper.find('DraftEditor')).to.exist
  })

  it('Should render with font Arial.', () => {
    expect(_wrapper).to.have.style('font-family', 'Arial')
  })

  it('Should render with font-size 16.', () => {
    expect(_wrapper).to.have.style('font-size', '16pt')
  })

  it('Should render with font-weight normal.', () => {
    expect(_wrapper).to.have.style('font-weight', 'normal')
  })

  it('Should render with color #000000.', () => {
    expect(_wrapper).to.have.style('color', '#000000')
  })
})
