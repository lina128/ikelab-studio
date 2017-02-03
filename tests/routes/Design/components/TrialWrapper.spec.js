import React from 'react'
import { shallow } from 'enzyme'
import TrialWrapper from 'routes/Design/components/TrialWrapper'

describe('(Design/component) TrialWrapper', () => {
	let _wrapper, _props;
	
	beforeEach(() => {
		_props = {
			trial: {},
			onChange: el => el
		}
		_wrapper = shallow(<TrialWrapper {..._props} />)
	})

	it('Should have class design_trialWrapper_default.', () => {
		expect(_wrapper.find('.design_trialWrapper_default')).to.exist
	})
})