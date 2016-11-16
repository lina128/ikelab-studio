import React, { Component, PropTypes } from 'react'

export default class Input extends Component {
	constructor(props) {
		super(props)
		this.state = {value: ''}
		this.handleChange = this.handleChange.bind(this)
	}
	
	static propTypes = {
		customStyle: PropTypes.object,
		onBlur: PropTypes.func.isRequired
	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	
	render() {
		const { customStyle, onBlur } = this.props;
		
		return (
			<input style={customStyle} type="text" value={this.state.value} onChange={this.handleChange} onBlur={onBlur} />
		)
	}
}