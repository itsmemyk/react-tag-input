import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

import InputPopup from './popup';
import './style.css';

const stripKeyword = (value, limit, key) => {
	const pos = value.lastIndexOf(key, limit);
	const posEnd = value.indexOf(' ', pos);
	return value.substr(pos+1, posEnd > -1 ? posEnd : value.length);
}

const joinKeyword = (value, patch, limit, key) => {
	const pos = value.lastIndexOf(key, limit);
	const posEnd = value.indexOf(' ', pos);
	return value.substr(0, pos+1) + patch + (posEnd > -1 ? value.substr(posEnd) : '');
}

export class InputWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.defaultValue,
			showPopup: false,
			keyword: '',
		};
		this.input = null;
	}

	getNode() {
		return ReactDOM.findDOMNode(this.input);
	}

	setValues(data) {
		this.setState(data);
		if(this.props.onChange) {
			this.props.onChange(data.value);
		}
	}

	handleChange(e) {
		const { value } = e.target;
		const startSelection = this.getNode().selectionStart;
		let keyword = stripKeyword(value, startSelection, this.props.tagSymbol);

		let { showPopup } = this.state;

		if (value.lastIndexOf(this.props.tagSymbol) === value.length-1) {
			showPopup = true;
		} else if (value.lastIndexOf(' ') === value.length-1) {
			showPopup = false;
		}

		if (startSelection !== value.length) {
			const splitWord = value.substr(0, this.getNode().selectionStart);
			const pickWord = splitWord.substr(splitWord.lastIndexOf(' ') > -1 ? splitWord.lastIndexOf(' ') : 0);
			const isKeyword = pickWord.trim().indexOf(this.props.tagSymbol) === 0;
			showPopup = isKeyword;
			if(isKeyword) keyword = pickWord.trim().substr(1);
		}
		if(value.length === 0) {
			showPopup = false;
		}
		this.setValues({ value, showPopup, keyword });
	}

	onSelect(name, showPopup = false) {
		const { value } = this.state;
		const startSelection = this.getNode().selectionStart;
		let joinValue = joinKeyword(value, name, startSelection, this.props.tagSymbol).trim() + ' ';
		this.setValues({ value: joinValue, showPopup })

		setTimeout(() => {
			const pos = value.lastIndexOf(this.props.tagSymbol, startSelection);
			const newIndex = pos + name.length + 2;
			this.getNode().setSelectionRange(newIndex, newIndex);
		}, 50);
	}

	onKeyDown(e) {
		const handleCodes = [38, 40, 9, 13];
		if(handleCodes.indexOf(e.keyCode) > -1 && this.state.showPopup) {
			e.preventDefault();
			this.popup.triggerKeyboard(e);
		}
	}

	render() {
		const { showPopup, value, keyword } = this.state;
		const { predicate, data } = this.props;
		return (
			<div className="custom-input-control">
				<FormGroup>
					<InputGroup>
						<InputGroup.Addon> + </InputGroup.Addon>
						<FormControl
							ref={(input) => this.input = input}
							type="text"
							value={value}
							onKeyDown={(e) => this.onKeyDown(e)}
							onChange={(e) => this.handleChange(e)}
						/>
					</InputGroup>
				</FormGroup>
				<InputPopup
					ref={(popup) => this.popup = popup}
					show={showPopup}
					keyword={keyword}
					predicate={predicate}
					data={data}
					onDone={() => this.setState({ showPopup: false })}
					onSelect={(name) => this.onSelect(name)}
				/>
			</div>
		);
	}
};

InputWrapper.propTypes = {
	data: PropTypes.array,
	predicate: PropTypes.object.isRequired,
	tagSymbol: PropTypes.string,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
};

InputWrapper.defaultProps = {
	data: [],
	defaultValue: '',
	predicate: {
		key: 'username',
		selector: () => true,
	},
	tagSymbol: '@',
};

export default InputWrapper;
