import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
import { ConditionPane } from 'routes/Design/containers/ConditionPane'

describe('(Container) ConditionPane', () => {
	let _wrapper, _props, _spies
	
	beforeEach(() => {
		_spies = {}
		_props = {
			condition: [
				{
					id: 1,
					name: 'Condition1',
					color: "#3498db"
				}
			],
			...bindActionCreators({
				onRenameCondition: (_spies.onRenameCondition = sinon.spy()),
				onSelectMode: (_spies.onSelectMode = sinon.spy())
			}, _spies.dispatch = sinon.spy())
		}
		_wrapper = shallow(<ConditionPane {..._props} />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should has class desgin_conditionPane_default.', () => {
		expect(_wrapper.hasClass('design_conditionPane_default')).to.equal(true)
	})
	
	it('Should render a h1 titled Condition.', () => {
		expect(_wrapper.find('h1').text()).to.match(/Condition/)
	})
	
	it('Should render a List component.', () => {
		expect(_wrapper.find('List')).to.exist
	})
	
	it('Should render a ListItem component.', () => {
		expect(_wrapper.find('ListItem')).to.exist
	})
	
	it('Should render an Input component.', () => {
		expect(_wrapper.find('Input')).to.exist
	})
	
	it('Should render a MagicWand component.', () => {
		expect(_wrapper.find('MagicWand')).to.exist
	})
})