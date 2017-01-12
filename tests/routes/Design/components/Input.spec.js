import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
import Input from 'routes/Design/components/Input'

describe('(Component) Input', () => {
	let _wrapper, _props, _spies
	
	beforeEach(() => {
		_spies = {}
		_props = {
			value: '',
			...bindActionCreators({
				onBlur: (_spies.onBlur = sinon.spy())
			}, _spies.dispatch = sinon.spy())
		}
		_wrapper = shallow(<Input { ..._props } />)
	})
	
	it('Should render as an input.', () => {
		expect(_wrapper.is('input')).to.equal(true)
	})
	
	it('Should have a value that reflects the component`s state.', () => {
		expect(_wrapper.state().value).to.equal('')
		expect(_wrapper.props().value).to.equal('')
		_wrapper.setState({value: 'Condition1'})
		expect(_wrapper.state().value).to.equal('Condition1')
		expect(_wrapper.props().value).to.equal('Condition1')
	})
	
	it('Should change value as the user types.', () => {
		_wrapper.find('input').simulate('change', {target: {value: 'Condition2'}})
		expect(_wrapper.props().value).to.equal('Condition2')
		expect(_wrapper.state().value).to.equal('Condition2')
	})
	
	it('Should dispatch an action on blur.', () => {
		_spies.dispatch.should.have.not.been.called
		
		_wrapper.find('input').simulate('blur')
		_spies.dispatch.should.have.been.called
		_spies.onBlur.should.have.been.called
	})
})