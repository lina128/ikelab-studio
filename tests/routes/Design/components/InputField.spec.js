import React from 'react'
import { shallow } from 'enzyme'
import InputField from 'routes/Design/components/fields/InputField'

describe('(Design/components/fields) InputField', () => {
	let _wrapper, _props, _spies;
	
	beforeEach(() => {
		_spies = {};

		_props = {
			trialId: 1,
			fieldConstantKey: 'fontSize',
			fieldConstant: {
				name: 'Font Size',
				hints: 'pt'
			},
			fieldSetting: 16,
			onChange: el => el
		};
		
		_wrapper = shallow(<InputField {..._props} />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should have a Textfield component.', () => {
		expect(_wrapper.find('Textfield')).to.have.length(1)
	})
})