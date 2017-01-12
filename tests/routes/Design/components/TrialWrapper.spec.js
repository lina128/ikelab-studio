import React from 'react'
import { shallow } from 'enzyme'
import TrialWrapper from 'routes/Design/components/TrialWrapper'

describe('(Design/component) TrialWrapper', () => {
	let _wrapper
	
	beforeEach(() => {
		_wrapper = shallow(<TrialWrapper />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should has class design_trialWrapper_default.', () => {
		expect(_wrapper.hasClass('design_trialWrapper_default')).to.equal(true)
	})
})