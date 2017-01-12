import React from 'react'
import { shallow } from 'enzyme'
import { App } from 'routes/Design/components/Design'

describe('(Component) Design', () => {
	let _wrapper
	
	beforeEach(() => {
		_wrapper = shallow(<App />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should contain three children.', () => {
		expect(_wrapper.children()).to.have.length(3)
	})
})