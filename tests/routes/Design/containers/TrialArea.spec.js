import React from 'react'
import { shallow } from 'enzyme'
import { TrialArea } from 'routes/Design/containers/TrialArea'
import { defaultSetting } from 'routes/Design/modules/constants'

describe('(Design/contianers) TrialArea', () => {
	let _wrapper, _props
	
	beforeEach(() => {
		_props = {
			currentTrial: {
				id: 1,
				type: 'TEXT',
				setting: defaultSetting
			}
		}
		_wrapper = shallow(<TrialArea {..._props} />)
	})
	
	it('Should render a .design_trialArea_default.', () => {
		expect(_wrapper.find('.design_trialArea_default')).to.exist
	})
})