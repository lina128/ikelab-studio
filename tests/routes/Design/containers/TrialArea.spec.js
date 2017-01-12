import React from 'react'
import { shallow } from 'enzyme'
import { TrialArea } from 'routes/Design/containers/TrialArea'

describe('(Design/contianers) TrialArea', () => {
	let _wrapper, _props
	
	beforeEach(() => {
		_props = {
			currentTrial: {
				id: 1,
				type: 'TEXT',
				setting: {
					content: {
						type: 'TextArea',
						value: ''
					},
					font: {
						type: 'List',
						value: 'Arial'
					},
					fontSize: {
						type: 'Number',
						value: 12
					},
					fontWeight: {
						type: 'List',
						value: 'normal'
					},
					fontColor: {
						type: 'ColorPicker',
						value: '#000000'
					},
					alignH: {
						type: 'List',
						value: 'center'
					},
					alignV: {
						type: 'List',
						value: 'middle'
					}
				}
			}
		}
		_wrapper = shallow(<TrialArea {..._props} />)
	})
	
	it('Should render a .design_trialArea_default.', () => {
		expect(_wrapper.find('.design_trialArea_default')).to.exist
	})
})