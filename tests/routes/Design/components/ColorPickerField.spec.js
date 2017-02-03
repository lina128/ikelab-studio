import React from 'react'
import { shallow } from 'enzyme'
import ColorPickerField from 'routes/Design/components/fields/ColorPickerField'

describe('(Design/components/fields) ColorPickerField', () => {
	let _wrapper, _props;
	
	beforeEach(() => {
		_props = {
			trialId: 1,
			fieldConstantKey: 'fontColor',
			fieldConstant: {
				name: 'Font Color',
				hints: ''
			},
			fieldSetting: '#000000',
			onChange: el => el
		};
		
		_wrapper = shallow(<ColorPickerField {..._props} />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should have a ColorPicker component.', () => {
		expect(_wrapper.find('ColorPicker')).to.have.length(1)
	})
})