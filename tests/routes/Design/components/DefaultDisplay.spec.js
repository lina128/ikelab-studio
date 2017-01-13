import React from 'react'
import { shallow } from 'enzyme'
import DefaultDisplay from 'routes/Design/components/paradigms/DefaultDisplay'

describe('(Design/components/paradigms) DefaultDisplay', () => {
	let _wrapper, _props
	
	beforeEach(() => {
		_props = {
			trial: {
				id: 1,
				type: 'TEXT',
				setting: {
					content: {
						type: 'TextArea',
						value: 'TEXT'
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
		
		_wrapper = shallow(<DefaultDisplay { ..._props } />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
})