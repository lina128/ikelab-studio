import React from 'react'
import { shallow } from 'enzyme'
import Text from 'routes/Design/components/frames/Text'
import { defaultSetting } from 'routes/Design/modules/constants'

describe('(Design/components/frames) Text', () => {
	let _wrapper, _props
	
	beforeEach(() => {
		_props = {
			trial: {
				id: 1,
				type: 'TEXT',
				setting: defaultSetting
			}
		}
		
		_wrapper = shallow(<Text { ..._props } />)
	})
	
	it('Should render as a div.', () => {
		expect(_wrapper.is('div')).to.equal(true)
	})
	
	it('Should have a class design_Text_editor.', () => {
		expect(_wrapper.hasClass("design_Text_editor")).to.equal(true)
	})
	
	it('Should have an Editor.', () => {
		expect(_wrapper.find('DraftEditor')).to.exist
	})
	
	it('Should render with font Arial.', () => {
		expect(_wrapper).to.have.style('font', 'Arial')
	})
	
	it('Should render with font-size 16.', () => {
		expect(_wrapper).to.have.style('font-size', '16pt')
	})
	
	it('Should render with font-weight normal.', () => {
		expect(_wrapper).to.have.style('font-weight', 'normal')
	})
	
	it('Should render with color #000000.', () => {
		expect(_wrapper).to.have.style('color', '#000000')
	})
	
	it('Should render with center alignment.', () => {
		expect(_wrapper).to.have.style('justify-content', 'center')
		expect(_wrapper).to.have.style('align-items', 'center')
	})
	
	it('Should start the text on the top left with justify-content and align-items being flex-start.', () => {
		_props = {
			trial: {
				id: 1,
				type: 'TEXT',
				setting: { 
					...defaultSetting, 
					alignH: {
						type: 'List',
						value: 'left',
						display: true,
						hints: ''
					},
					alignV: {
						type: 'List',
						value: 'top',
						display: true,
						hints: ''
					}
				}
			}
		}
		_wrapper.setProps(_props)
		
		expect(_wrapper).to.have.style('justify-content', 'flex-start')
		expect(_wrapper).to.have.style('align-items', 'flex-start')
	})
})