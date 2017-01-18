export const ItemTypes = {
	TRIAL: 'trial',
	BLOCK: 'block'
}

export const Dimensions = {
	TRIALHEIGHT: 45,
	TRIALWIDTH: 60
}

export const ColorPalette = [
	"#3498db",
	"#e74c3c",
	"#1abc9c",
	"#f39c12",
	"#446cb3",
	"#e08283",
	"#674172",
	"#1e824c",
	"#2c3e50",
	"#d2527f"
]

export const defaultType = 'TEXT'

export const defaultSetting = {
	content: {
		name: 'Content',
		type: 'TextArea',
		value: '',
		display: false,
		hints: ''
	},
	font: {
		name: 'Font',
		type: 'List',
		value: 'Arial',
		display: true,
		hints: ''
	},
	fontSize: {
		name: 'Font Size',
		type: 'Input',
		value: 16,
		display: true,
		hints: 'pt'
	},
	fontWeight: {
		name: 'Font Weight',
		type: 'List',
		value: 'normal',
		display: true,
		hints: ''
	},
	fontColor: {
		name: 'Font Color',
		type: 'ColorPicker',
		value: '#000000',
		display: true,
		hints: ''
	},
	alignH: {
		name: 'Horizontal Align',
		type: 'List',
		value: 'center',
		display: true,
		hints: ''
	},
	alignV: {
		name: 'Vertical Align',
		type: 'List',
		value: 'middle',
		display: true,
		hints: ''
	}
}