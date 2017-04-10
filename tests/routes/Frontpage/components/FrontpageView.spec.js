import React from 'react'
import FrontpageView from 'routes/Frontpage/components/FrontpageView'
import { render } from 'enzyme'

describe('(View) Frontpage', () => {
  let _component

  beforeEach(() => {
    _component = render(<FrontpageView />)
  })

  it('Renders a welcome message', () => {
    const welcome = _component.find('div')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/Welcome!/)
  })
})
