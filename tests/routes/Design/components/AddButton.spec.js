import React from 'react'
import { bindActionCreators } from 'redux'
import AddButton from 'routes/Design/components/AddButton'
import { shallow } from 'enzyme'

describe('(Component) AddButton', () => {
	let _wrapper, _props
	
	beforeEach(() => {
		_spies = {}
		_props = {
			...bindActionaCreators({
				addTrial: (_spies.addAtrial = sinon.spy())
			}, _spies.dispatch = sinon.spy())
			text: 'Add'
		}
		_wrapper = shallow(<AddButton { ..._props }/>)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should render with an <img> that shows an add icon.', () => {
		expect(_wrapper.find('img')).to.exist
	})
	
	it('Should render props.text below the <img>.', () => {
		expect(_wrapper.find('span').text()).to.match(/Add/)
		_wrapper.setProps({ text: 'New' })
		expect(_wrapper.find('span').text()).to.match(/New/)
	})
	
	it('Should dispatch an action when clicked', () => {
		_spies.dispatch.should.have.not.been.called
		
		_wrapper.simulate('click')
		
		_spies.dispatch.should.have.been.called
		_spies.addTrial.should.have.been.called
	})
})