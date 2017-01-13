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
		type: 'TextArea',
		value: ''
	},
	font: {
		type: 'List',
		value: 'Arial'
	},
	fontSize: {
		type: 'Number',
		value: 16
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