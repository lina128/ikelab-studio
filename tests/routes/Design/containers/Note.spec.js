import React from 'react'
import { shallow } from 'enzyme'
import { Note } from 'routes/Design/containers/Note'

describe('(Design/Container) Note', () => {
	let _wrapper, _props
	
	beforeEach(() => {
		_props = {
			message: ''
		}
		
		_wrapper = shallow(<Note {..._props} />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should have class design_note.', () => {
		expect(_wrapper.hasClass('design_note')).to.equal(true)
	})
	
	it('Should change display according to message.', () => {
		expect(_wrapper).to.have.style('visibility', 'hidden')
		_wrapper.setProps({ message: 'test' })
		expect(_wrapper).to.have.style('visibility', 'visible')
	})
})