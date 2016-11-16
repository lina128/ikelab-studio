import React from 'react'
import { shallow } from 'enzyme'
import NavBar from 'routes/Design/components/NavBar'

describe('(Component) NavBar', () => {
	let _wrapper
	
	beforeEach(() => {
		_wrapper = shallow(<NavBar />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should has class design_navbar_default.', () => {
		expect(_wrapper.hasClass('design_navbar_default')).to.equal(true)
	})
	
	it('Should have two children.', () => {
		expect(_wrapper.children()).to.have.length(2)
	})
})