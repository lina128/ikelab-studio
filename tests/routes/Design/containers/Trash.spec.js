import React from 'react'
import { shallow } from 'enzyme'
import { Trash } from 'routes/Design/containers/Trash'

describe('(Design/contianers) Trash', () => {
	let _wrapper
	
	beforeEach(() => {
		_wrapper = shallow(<Trash />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should have class design_trash_default.', () => {
		expect(_wrapper.hasClass('design_trash_default')).to.equal(true)
	})
	
	it('Should render an img with a trashcan icon.', () => {
		let img = _wrapper.find('img')
		expect(img).to.exist
		expect(img).to.have.attr('alt', 'Trash')
	})
})