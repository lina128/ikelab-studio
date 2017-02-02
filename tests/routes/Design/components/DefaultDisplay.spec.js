import React from 'react'
import { shallow } from 'enzyme'
import DefaultDisplay from 'routes/Design/components/frames/DefaultDisplay'
import { defaultSetting } from 'routes/Design/modules/constants'

describe('(Design/components/frames) DefaultDisplay', () => {
	let _wrapper, _props
	
	beforeEach(() => {
		_props = {
			trial: {
				id: 1,
				type: 'TEXT',
				setting: defaultSetting
			}
		}
		
		_wrapper = shallow(<DefaultDisplay { ..._props } />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
})