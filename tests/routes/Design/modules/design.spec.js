import { 
	addBlock,
	addCondition,
	addRun,
	addTrial,
	changeSetting,
	clickTrial,
	moveInside,
	moveNode,
	moveOutside,
	renameCondition,
	selectTrial,
	toggleSelectMode,
	updateStructure,
	default as designReducer
} from 'routes/Design/modules/design'

import { defaultType } from 'routes/Design/constants'
import { DEFAULTMODULE } from 'routes/Design/constants/field.constants'

function defaultSetting() {
	let setting = {};
	
	for(let s in DEFAULTMODULE) {
		setting[s] = DEFAULTMODULE[s].value
	}
	
	return setting
}

describe('(Design/modules)', () => {
	let _initialState
	
	const defaultTrialSetting = defaultSetting()
	const defaultTrialType = defaultType
	
	beforeEach(() => {
		_initialState = {
					counter: 0,
					condition: [],
					currentTrial: null,
					structure: [],
					entities: [],
					message: '',
					selected: [],
					selectId: null,
					selectMode: false
				}
	})
	
	describe('reducer', () => {
		it('Should initialize with an initial state.', () => {
			expect(designReducer(undefined, {})).to.deep.equal(_initialState)
		})
		
		it('Should return the previous state if an action is not matched.', () => {
			const state1 = designReducer(undefined, {})
			expect(state1).to.deep.equal(_initialState)
			const state2 = designReducer(state1, { type: '@@@@@@@' })
			expect(state2).to.deep.equal(_initialState)
		})
	})

	describe('handlers', () => {
		it('Should handle ADD_BLOCK', () => {
			const state1 = designReducer(undefined, {})
			const state2 = designReducer(state1, addBlock())
			expect(state2).to.deep.equal({
				counter: 1,
				condition: [],
				currentTrial: null,
				structure: [
					{
						id: 1,
						level: 'block',
						name: 'Block1',
						children: []
					}
				],
				entities: [],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
		})
		
		it('Should handle ADD_CONDITION', () => {
			const state1 = designReducer(undefined, {})
			expect(state1).to.deep.equal(_initialState)
			const state2 = designReducer(state1, addCondition())
			expect(state2).to.deep.equal({
				counter: 1,
				condition: [
					{
						id: 1,
						name: 'Condition1',
						color: "#3498db"
					}
				],
				currentTrial: null,
				structure: [],
				entities: [],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
			const state3 = designReducer(state2, addCondition())
			expect(state3).to.deep.equal({
				counter: 2,
				condition: [
					{
						id: 1,
						name: 'Condition1',
						color: "#3498db"
					},
					{
						id: 2,
						name: 'Condition2',
						color: "#e74c3c"
					}
				],
				currentTrial: null,
				structure: [],
				entities: [],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
			const state4 = designReducer(state3, addCondition())
			const state5 = designReducer(state4, addCondition())
			const state6 = designReducer(state5, addCondition())
			const state7 = designReducer(state6, addCondition())
			const state8 = designReducer(state7, addCondition())
			const state9 = designReducer(state8, addCondition())
			const state10 = designReducer(state9, addCondition())
			const state11 = designReducer(state10, addCondition())
			const state12 = designReducer(state11, addCondition())
			expect(state12).to.deep.equal({
				counter: 10,
				condition: [
					{
						id: 1,
						name: 'Condition1',
						color: "#3498db"
					},
					{
						id: 2,
						name: 'Condition2',
						color: "#e74c3c"
					},
					{
						id: 3,
						name: 'Condition3',
						color: "#1abc9c"
					},
					{
						id: 4,
						name: 'Condition4',
						color: "#f39c12"
					},
					{
						id: 5,
						name: 'Condition5',
						color: "#446cb3"
					},
					{
						id: 6,
						name: 'Condition6',
						color: "#e08283"
					},
					{
						id: 7,
						name: 'Condition7',
						color: "#674172"
					},
					{
						id: 8,
						name: 'Condition8',
						color: "#1e824c"
					},
					{
						id: 9,
						name: 'Condition9',
						color: "#2c3e50"
					},
					{
						id: 10,
						name: 'Condition10',
						color: "#d2527f"
					}
				],
				currentTrial: null,
				structure: [],
				entities: [],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
		})
		
		it('Should handle ADD_RUN', () => {
			const state1 = designReducer(undefined, {})
			const state2 = designReducer(state1, addRun())
			expect(state2).to.deep.equal({
				counter: 1,
				condition: [],
				currentTrial: null,
				structure: [
					{
						id: 1,
						level: 'run',
						name: 'Run1',
						children: []
					}
				],
				entities: [],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
		})
		
		it('Should handle ADD_TRIAL', () => {
			const state1 = designReducer(undefined, {})
			const state2 = designReducer(state1, addTrial())

			expect(state2).to.deep.equal({
				counter: 1,
				condition: [],
				currentTrial: 1,
				structure: [
					{
						id: 1,
						level: 'trial',
						selected: false,
						condition: [],
						screenshot: null
					}
				],
				entities: [
					{
						id: 1,
						type: defaultTrialType,
						setting: defaultTrialSetting
					}
				],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
		})
		
		it('Should handle CLICK_TRIAL', () => {
			const state1 = designReducer(undefined, {})
			const state2 = designReducer(state1, addTrial())
			const state3 = designReducer(state2, clickTrial(1))
			expect(state3).to.deep.equal({
				counter: 1,
				condition: [],
				currentTrial: 1,
				structure: [
					{
						id: 1,
						level: 'trial',
						selected: false,
						condition: [],
						screenshot: null
					}
				],
				entities: [
					{
						id: 1,
					  type: defaultTrialType,
					  setting: defaultTrialSetting
					}
				],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
		})
		
		it('Should handle MOVE_INSIDE', () => {
			const state1 = designReducer(undefined, {})
			const state2 = designReducer(state1, addTrial())
			const state3 = designReducer(state2, addBlock())
			const state4 = designReducer(state3, moveInside(1, 2))

			expect(state4).to.deep.equal({
				counter: 2,
				condition: [],
				currentTrial: 1,
				structure: [
					{
						id: 2,
						level: 'block',
						name: 'Block2',
						children: [
							{
								id: 1,
								level: 'trial',
								selected: false,
								condition: [],
								screenshot: null
							}
						]
					}
				],
				entities: [
					{
						id: 1,
						type: defaultTrialType,
						setting: defaultTrialSetting
					}
				],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
			
			const state5 = designReducer(state4, addRun())
			const state6 = designReducer(state5, moveInside(2, 3))

			expect(state6).to.deep.equal({
				counter: 3,
				condition: [],
				currentTrial: 1,
				structure: [
					{
						id: 3,
						level: 'run',
						name: 'Run3',
						children: [
							{
								id: 2,
								level: 'block',
								name: 'Block2',
								children: [
									{
										id: 1,
										level: 'trial',
										selected: false,
										condition: [],
										screenshot: null
									}
								]
							}
						]
					}
				],
				entities: [
					{
						id: 1,
						type: defaultTrialType,
						setting: defaultTrialSetting
					}
				],
				message: '',
				selected: [],
				selectId: null,
				selectMode: false
			})
		})
	})
	
	it('Should handle MOVE_NODE (trial)', () => {
		const state1 = designReducer(undefined, {})
		const state2 = designReducer(state1, addTrial())
		const state3 = designReducer(state2, addTrial())

		expect(state3).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: 2,
			structure: [
				{
					id: 1,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				},
				{
					id: 2,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				}
			],
			entities: [
				{
					id: 1,
					type: defaultTrialType,
					setting: defaultTrialSetting
				},
				{
					id: 2,
					type: defaultTrialType,
					setting: defaultTrialSetting
				}
			],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
		
		const state4 = designReducer(state3, moveNode(1, 2, 'DOWN'))
		
		expect(state4).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: 2,
			structure: [
				{
					id: 2,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				},
				{
					id: 1,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				}
			],
			entities: [
				{
					id: 1,
					type: defaultTrialType,
					setting: defaultTrialSetting
				},
				{
					id: 2,
					type: defaultTrialType,
					setting: defaultTrialSetting
				}
			],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
		
		const state5 = designReducer(state4, moveNode(1, 2, 'UP'))
		
		expect(state5).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: 2,
			structure: [
				{
					id: 1,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				},
				{
					id: 2,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				}
			],
			entities: [
				{
					id: 1,
					type: defaultTrialType,
					setting: defaultTrialSetting
				},
				{
					id: 2,
					type: defaultTrialType,
					setting: defaultTrialSetting
				}
			],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
	})
	
	it('Should handle MOVE_NODE (block)', () => {
		const state1 = designReducer(undefined, {})
		const state2 = designReducer(state1, addBlock())
		const state3 = designReducer(state2, addBlock())
		
		expect(state3).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: null,
			structure: [
				{
					id: 1,
					level: 'block',
					name: 'Block1',
					children: []
				},
				{
					id: 2,
					level: 'block',
					name: 'Block2',
					children: []
				}
			],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
		
		const state4 = designReducer(state3, moveNode(1, 2, 'DOWN'))
		
		expect(state4).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: null,
			structure: [
				{
					id: 2,
					level: 'block',
					name: 'Block2',
					children: []
				},
				{
					id: 1,
					level: 'block',
					name: 'Block1',
					children: []
				}
			],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
		
		const state5 = designReducer(state4, moveNode(1, 2, 'UP'))
		
		expect(state5).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: null,
			structure: [
				{
					id: 1,
					level: 'block',
					name: 'Block1',
					children: []
				},
				{
					id: 2,
					level: 'block',
					name: 'Block2',
					children: []
				}
			],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
	})
	
	it('Should handle MOVE_NODE (run)', () => {
		const state1 = designReducer(undefined, {})
		const state2 = designReducer(state1, addRun())
		const state3 = designReducer(state2, addRun())
		
		expect(state3).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: null,
			structure: [
				{
					id: 1,
					level: 'run',
					name: 'Run1',
					children: []
				},
				{
					id: 2,
					level: 'run',
					name: 'Run2',
					children: []
				}
			],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
		
		const state4 = designReducer(state3, moveNode(1, 2, 'DOWN'))
		
		expect(state4).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: null,
			structure: [
				{
					id: 2,
					level: 'run',
					name: 'Run2',
					children: []
				},
				{
					id: 1,
					level: 'run',
					name: 'Run1',
					children: []
				}
			],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
		
		const state5 = designReducer(state4, moveNode(1, 2, 'UP'))
		
		expect(state5).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: null,
			structure: [
				{
					id: 1,
					level: 'run',
					name: 'Run1',
					children: []
				},
				{
					id: 2,
					level: 'run',
					name: 'Run2',
					children: []
				}
			],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
	})
	
	it('Should handle MOVE_OUTSIDE', () => {
		const state1 = designReducer(undefined, {})
		const state2 = designReducer(state1, addTrial())
		const state3 = designReducer(state2, addBlock())
		const state4 = designReducer(state3, moveInside(1, 2))

		expect(state4).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: 1,
			structure: [
				{
					id: 2,
					level: 'block',
					name: 'Block2',
					children: [
						{
							id: 1,
							level: 'trial',
							selected: false,
							condition: [],
							screenshot: null
						}
					]
				}
			],
			entities: [
				{
					id: 1,
					type: defaultTrialType,
					setting: defaultTrialSetting
				}
			],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
		
		const state5 = designReducer(state4, moveOutside(1))
		
		expect(state5).to.deep.equal({
			counter: 2,
			condition: [],
			currentTrial: 1,
			structure: [
				{
					id: 1,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				},
				{
					id: 2,
					level: 'block',
					name: 'Block2',
					children: []
				}
			],
			entities: [
				{
					id: 1,
					type: defaultTrialType,
					setting: defaultTrialSetting
				}
			],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
	})
	
	it('Should handle RENAME_CONDITION', () => {
		const state1 = designReducer(undefined, {})
		const state2 = designReducer(state1, addCondition())
		
		expect(state2).to.deep.equal({
			counter: 1,
			condition: [
				{
					id: 1,
					name: 'Condition1',
					color: "#3498db"
				}
			],
			currentTrial: null,
			structure: [],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
		
		const state3 = designReducer(state2, renameCondition(1, 'Congruent'))
		
		expect(state3).to.deep.equal({
			counter: 1,
			condition: [
				{
					id: 1,
					name: 'Congruent',
					color: "#3498db"
				}
			],
			currentTrial: null,
			structure: [],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
	})
	
	it('Should handle TOGGLE_SELECT_MODE', () => {
		const state1 = designReducer(undefined, {})
		const state2 = designReducer(state1, toggleSelectMode('testId', {condition: ['#3498db']}, 'extend'))
		
		expect(state2).to.deep.equal({
			counter: 0,
			condition: [],
			currentTrial: null,
			structure: [],
			entities: [],
			message: 'Selecting trials...',
			selected: [],
			selectId: 'testId',
			selectMode: true
		})
		
		const state3 = designReducer(state2, toggleSelectMode('anotherId', {condition: ['#000000']}, 'extend'))
		
		expect(state3).to.deep.equal({
			counter: 0,
			condition: [],
			currentTrial: null,
			structure: [],
			entities: [],
			message: 'Selecting trials...',
			selected: [],
			selectId: 'testId',
			selectMode: true
		})
		
		const state4 = designReducer(state3, toggleSelectMode('testId', {condition: ['#3498db']}, 'extend'))
		
		expect(state4).to.deep.equal({
			counter: 0,
			condition: [],
			currentTrial: null,
			structure: [],
			entities: [],
			message: '',
			selected: [],
			selectId: null,
			selectMode: false
		})
	})
	
	it('Should handle SELECT_TRIAL', () => {
		const state1 = designReducer(undefined, {})
		const state2 = designReducer(state1, toggleSelectMode('testId', {condition: ['#3498db']}, 'extend'))
		const state3 = designReducer(state2, addTrial())
		const state4 = designReducer(state3, selectTrial(1))

		expect(state4).to.deep.equal({
			counter: 1,
			condition: [],
			currentTrial: 1,
			structure: [
				{
					id: 1,
					level: 'trial',
					selected: true,
					condition: [],
					screenshot: null
				}
			],
			entities: [
				{
					id: 1,
					type: defaultTrialType,
					setting: defaultTrialSetting
				}
			],
			message: 'Selecting trials...',
			selected: [1],
			selectId: 'testId',
			selectMode: true
		})
		
		const state5 = designReducer(state4, selectTrial(1))
		
		expect(state5).to.deep.equal({
			counter: 1,
			condition: [],
			currentTrial: 1,
			structure: [
				{
					id: 1,
					level: 'trial',
					selected: false,
					condition: [],
					screenshot: null
				}
			],
			entities: [
				{
					id: 1,
					type: defaultTrialType,
					setting: defaultTrialSetting
				}
			],
			message: 'Selecting trials...',
			selected: [],
			selectId: 'testId',
			selectMode: true
		})
		
		const state6 = designReducer(state5, selectTrial(1))
		expect(state6).to.deep.equal({
			counter: 1,
			condition: [],
			currentTrial: 1,
			structure: [
				{
					id: 1,
					level: 'trial',
					selected: true,
					condition: [],
					screenshot: null
				}
			],
			entities: [
				{
					id: 1,
					type: defaultTrialType,
					setting: defaultTrialSetting
				}
			],
			message: 'Selecting trials...',
			selected: [1],
			selectId: 'testId',
			selectMode: true
		})
	})
})