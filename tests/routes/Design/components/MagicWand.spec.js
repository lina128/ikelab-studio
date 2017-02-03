import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
import MagicWand from 'routes/Design/components/MagicWand'

describe('(Component) MagicWand', () => {
	let _wrapper, _props, _spies
	
	beforeEach(() => {
		_spies = {}
		_props = {
			id: 'MagicWand1',
			content: {},
			...bindActionCreators({
				onWandClick: (_spies.onWandClick = sinon.spy())
			}, _spies.dispatch = sinon.spy())
		}
		_wrapper = shallow(<MagicWand { ..._props } />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should has class design_magicWand_default.', () => {
		expect(_wrapper.hasClass('design_magicWand_default')).to.equal(true)
	})
	
	it('Should dispatch an action on click.', () => {
		_spies.dispatch.should.have.not.been.called
		
		_wrapper.find('div').simulate('click')
		_spies.dispatch.should.have.been.called
		_spies.onWandClick.should.have.been.called
	})
})