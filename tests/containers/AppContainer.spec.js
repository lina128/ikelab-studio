import React from 'react'
import { shallow } from 'enzyme'

import AppContainer from 'containers/AppContainer'

describe('(Containers) AppContainer', () => {
	let wrapper
	
	beforeEach(() => {
		wrapper = shallow(<AppContainer />)
	})
	
	it('has a Router component', () => {
		expect(wrapper.find('Router')).to.have.length(1)
	})
})