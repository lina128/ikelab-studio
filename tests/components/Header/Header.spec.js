import React from 'react'
import { Header } from 'components/Header/Header'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Renders a welcome message', () => {
    const welcome = _wrapper.find('h1')
    expect(welcome).to.exist
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Home route', () => {
      expect(_wrapper.contains(
        <IndexLink to='/' activeClassName='route--active' >
          Home
        </IndexLink>
      )).to.be.true
    })

    it('Should render a Link to Studio route', () => {
      expect(_wrapper.contains(
        <Link to='/studio' activeClassName='route--active' >
          Studio
        </Link>
      )).to.be.true
    })
  })
})
