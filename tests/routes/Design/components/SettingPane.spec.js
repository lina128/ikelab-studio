import React from 'react'
import { shallow } from 'enzyme'
import SettingPane from 'routes/Design/components/SettingPane'
import { defaultSetting } from 'routes/Design/modules/constants'

describe('(Design/components) SettingPane', () => {
	let _wrapper, _props
	
	beforeEach(() => {
		_props = {
			trial: {
				id: 1,
				type: 'TEXT',
				setting: defaultSetting
			}
		}
		
		_wrapper = shallow(<SettingPane { ..._props } />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should contain DefaultCard.', () => {
		expect(_wrapper.find('DefaultCard')).to.exist
	})
})