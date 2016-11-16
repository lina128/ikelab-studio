import React from 'react'
import { shallow } from 'enzyme'
import HorizontalBar from 'routes/Design/components/HorizontalBar'

describe('(Component) HorizontalBar', () => {
	let _wrapper
	
	beforeEach(() => {
		_wrapper = shallow(<HorizontalBar />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should have class design_horizontalBar_default', () => {
		expect(_wrapper.hasClass('design_horizontalBar_default')).to.equal(true)
	})
})